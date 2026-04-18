"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSocket } from "@/hooks/useSocket"
import { fetchAllMessages, sendNewMessage } from "@/services/chat.api"

interface ChatUser {
    _id: string
    fullName: string
    profilePicture?: string
}

interface Message {
    _id: string
    content: string
    sender: ChatUser
    chat: { _id: string } | string
    seenBy: string[]
    createdAt: string
    messageType: "text" | "image" | "file"
    pending?: boolean   // optimistic UI flag
}

// Replace with your actual auth hook/store
const useCurrentUser = () => {
    return { _id: "currentUserId", fullName: "You", profilePicture: undefined as string | undefined }
}

export default function ChatMessagesPage() {
    const { chatId } = useParams<{ chatId: string }>()
    const router = useRouter()
    const currentUser = useCurrentUser()
    const socket = useSocket(currentUser?._id)

    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const [otherUser, setOtherUser] = useState<ChatUser | null>(null)

    const bottomRef = useRef<HTMLDivElement>(null)
    const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // ── Load messages ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!chatId) return
        const load = async () => {
            try {
                const data = await fetchAllMessages(chatId)
                setMessages(data.data ?? [])
                // derive other user from first message not from currentUser
                const firstOther = data.data?.find(
                    (m: Message) => m.sender._id !== currentUser._id
                )?.sender
                if (firstOther) setOtherUser(firstOther)
            } catch (err) {
                console.error("Failed to load messages", err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [chatId])

    // ── Socket setup ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!socket || !chatId) return

        socket.emit("join-chat", chatId)

        socket.on("message-received", (msg: Message) => {
            setMessages(prev => [...prev, msg])
            // mark seen
            socket.emit("mark-seen", { chatId, userId: currentUser._id })
        })

        socket.on("typing", () => setIsTyping(true))
        socket.on("stop-typing", () => setIsTyping(false))
        socket.on("online-users", (users: string[]) => setOnlineUsers(users))

        return () => {
            socket.emit("leave-chat", chatId)
            socket.off("message-received")
            socket.off("typing")
            socket.off("stop-typing")
            socket.off("online-users")
        }
    }, [socket, chatId])

    // ── Auto scroll ──────────────────────────────────────────────────────────
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    // ── Typing events ────────────────────────────────────────────────────────
    const handleTyping = useCallback(() => {
        if (!socket) return
        socket.emit("typing", chatId)
        if (typingTimeout.current) clearTimeout(typingTimeout.current)
        typingTimeout.current = setTimeout(() => {
            socket.emit("stop-typing", chatId)
        }, 2000)
    }, [socket, chatId])

    // ── Send message ─────────────────────────────────────────────────────────
    const handleSend = async () => {
        const trimmed = input.trim()
        if (!trimmed || sending) return

        // Optimistic UI
        const optimistic: Message = {
            _id: `temp-${Date.now()}`,
            content: trimmed,
            sender: currentUser as ChatUser,
            chat: chatId,
            seenBy: [currentUser._id],
            createdAt: new Date().toISOString(),
            messageType: "text",
            pending: true
        }
        setMessages(prev => [...prev, optimistic])
        setInput("")
        if (socket) socket.emit("stop-typing", chatId)

        try {
            setSending(true)
            const data = await sendNewMessage({ chatId, message: trimmed })
            const saved: Message = data.data

            // Replace optimistic with real message
            setMessages(prev =>
                prev.map(m => m._id === optimistic._id ? saved : m)
            )

            // Broadcast via socket so other user gets it instantly
            if (socket) socket.emit("new-message", saved)
        } catch (err) {
            console.error("Failed to send message", err)
            // Remove optimistic on failure
            setMessages(prev => prev.filter(m => m._id !== optimistic._id))
        } finally {
            setSending(false)
            inputRef.current?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const isOnline = otherUser ? onlineUsers.includes(otherUser._id) : false

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const isSameDay = (a: string, b: string) =>
        new Date(a).toDateString() === new Date(b).toDateString()

    const formatDateLabel = (iso: string) => {
        const d = new Date(iso)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        if (d.toDateString() === today.toDateString()) return "Today"
        if (d.toDateString() === yesterday.toDateString()) return "Yesterday"
        return d.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })
    }

    return (
        <div className="page">
            {/* ── Header ── */}
            <header className="header">
                <button className="back-btn" onClick={() => router.push("/chats")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="header-avatar-wrap">
                    {otherUser?.profilePicture ? (
                        <img src={otherUser.profilePicture} alt={otherUser.fullName} className="header-avatar" />
                    ) : (
                        <div className="header-avatar-fallback">
                            {otherUser?.fullName?.charAt(0).toUpperCase() ?? "?"}
                        </div>
                    )}
                    {isOnline && <span className="header-online-dot" />}
                </div>

                <div className="header-info">
                    <span className="header-name">{otherUser?.fullName ?? "Loading…"}</span>
                    <span className={`header-status ${isOnline ? "online" : "offline"}`}>
                        {isOnline ? "Online" : "Offline"}
                    </span>
                </div>
            </header>

            {/* ── Messages ── */}
            <main className="messages-area">
                {loading ? (
                    <div className="loading-wrap">
                        <div className="spinner" />
                        <span>Loading messages…</span>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="no-messages">
                        <span>👋</span>
                        <p>Say hi to your potential flatmate!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isMine = msg.sender._id === currentUser._id
                        const showDate = idx === 0 || !isSameDay(messages[idx - 1].createdAt, msg.createdAt)
                        const showAvatar = !isMine && (
                            idx === messages.length - 1 ||
                            messages[idx + 1]?.sender._id !== msg.sender._id
                        )

                        return (
                            <div key={msg._id}>
                                {showDate && (
                                    <div className="date-divider">
                                        <span>{formatDateLabel(msg.createdAt)}</span>
                                    </div>
                                )}
                                <div className={`msg-row ${isMine ? "mine" : "theirs"}`}>
                                    {!isMine && (
                                        <div className="msg-avatar-slot">
                                            {showAvatar && (
                                                msg.sender.profilePicture
                                                    ? <img src={msg.sender.profilePicture} alt="" className="msg-avatar" />
                                                    : <div className="msg-avatar-fallback">{msg.sender.fullName.charAt(0)}</div>
                                            )}
                                        </div>
                                    )}
                                    <div className={`bubble ${isMine ? "bubble-mine" : "bubble-theirs"} ${msg.pending ? "pending" : ""}`}>
                                        <p>{msg.content}</p>
                                        <div className="bubble-meta">
                                            <span className="bubble-time">{formatTime(msg.createdAt)}</span>
                                            {isMine && (
                                                <span className="seen-indicator">
                                                    {msg.pending ? "⏳" : msg.seenBy.length > 1 ? "✓✓" : "✓"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="msg-row theirs">
                        <div className="msg-avatar-slot" />
                        <div className="bubble bubble-theirs typing-bubble">
                            <span className="dot" /><span className="dot" /><span className="dot" />
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </main>

            {/* ── Input ── */}
            <footer className="input-bar">
                <div className="input-wrap">
                    <textarea
                        ref={inputRef}
                        className="msg-input"
                        placeholder="Type a message…"
                        value={input}
                        rows={1}
                        onChange={e => {
                            setInput(e.target.value)
                            handleTyping()
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className={`send-btn ${input.trim() ? "active" : ""}`}
                        onClick={handleSend}
                        disabled={!input.trim() || sending}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
            </footer>

            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .page {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background: #f0faf4;
                    font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
                    max-width: 760px;
                    margin: 0 auto;
                }

                /* ── Header ── */
                .header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 20px;
                    background: #fff;
                    border-bottom: 1.5px solid #d1f0dd;
                    box-shadow: 0 1px 8px rgba(34,197,94,0.06);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }

                .back-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #16a34a;
                    padding: 6px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    transition: background 0.15s;
                    flex-shrink: 0;
                }

                .back-btn:hover { background: #f0faf4; }

                .header-avatar-wrap { position: relative; flex-shrink: 0; }

                .header-avatar {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #d1f0dd;
                }

                .header-avatar-fallback {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #fff;
                    font-size: 17px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .header-online-dot {
                    position: absolute;
                    bottom: 1px;
                    right: 1px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #22c55e;
                    border: 2px solid #fff;
                }

                .header-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .header-name {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1a2e23;
                }

                .header-status {
                    font-size: 12px;
                    font-weight: 500;
                }

                .header-status.online { color: #16a34a; }
                .header-status.offline { color: #86a895; }

                /* ── Messages Area ── */
                .messages-area {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .messages-area::-webkit-scrollbar { width: 4px; }
                .messages-area::-webkit-scrollbar-thumb { background: #d1f0dd; border-radius: 4px; }

                /* ── Loading / empty ── */
                .loading-wrap {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                    gap: 12px;
                    color: #86a895;
                    font-size: 14px;
                }

                .spinner {
                    width: 28px;
                    height: 28px;
                    border: 3px solid #d1f0dd;
                    border-top-color: #22c55e;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .no-messages {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    color: #86a895;
                    font-size: 14px;
                }

                .no-messages span { font-size: 36px; }

                /* ── Date divider ── */
                .date-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 16px 0 8px;
                }

                .date-divider span {
                    font-size: 11px;
                    font-weight: 600;
                    color: #86a895;
                    background: #e4f5eb;
                    padding: 3px 12px;
                    border-radius: 20px;
                    letter-spacing: 0.3px;
                }

                /* ── Message Row ── */
                .msg-row {
                    display: flex;
                    align-items: flex-end;
                    gap: 8px;
                    margin-bottom: 4px;
                }

                .msg-row.mine { justify-content: flex-end; }
                .msg-row.theirs { justify-content: flex-start; }

                .msg-avatar-slot {
                    width: 30px;
                    flex-shrink: 0;
                }

                .msg-avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .msg-avatar-fallback {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* ── Bubbles ── */
                .bubble {
                    max-width: 68%;
                    padding: 10px 14px;
                    border-radius: 18px;
                    font-size: 14.5px;
                    line-height: 1.5;
                    word-break: break-word;
                    animation: popIn 0.18s ease;
                }

                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.94) translateY(4px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }

                .bubble-mine {
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #fff;
                    border-bottom-right-radius: 4px;
                }

                .bubble-theirs {
                    background: #fff;
                    color: #1a2e23;
                    border: 1.5px solid #d1f0dd;
                    border-bottom-left-radius: 4px;
                }

                .bubble.pending { opacity: 0.65; }

                .bubble-meta {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 4px;
                    margin-top: 4px;
                }

                .bubble-time {
                    font-size: 10.5px;
                    opacity: 0.7;
                }

                .seen-indicator {
                    font-size: 11px;
                    opacity: 0.85;
                }

                /* ── Typing bubble ── */
                .typing-bubble {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 12px 16px;
                    min-width: 56px;
                }

                .dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #22c55e;
                    animation: bounce 1.2s infinite ease-in-out;
                }

                .dot:nth-child(2) { animation-delay: 0.2s; }
                .dot:nth-child(3) { animation-delay: 0.4s; }

                @keyframes bounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30%           { transform: translateY(-6px); opacity: 1; }
                }

                /* ── Input Bar ── */
                .input-bar {
                    padding: 12px 16px 16px;
                    background: #fff;
                    border-top: 1.5px solid #d1f0dd;
                }

                .input-wrap {
                    display: flex;
                    align-items: flex-end;
                    gap: 10px;
                    background: #f0faf4;
                    border: 1.5px solid #d1f0dd;
                    border-radius: 24px;
                    padding: 8px 8px 8px 16px;
                    transition: border-color 0.2s;
                }

                .input-wrap:focus-within { border-color: #22c55e; }

                .msg-input {
                    flex: 1;
                    background: none;
                    border: none;
                    outline: none;
                    font-size: 14.5px;
                    color: #1a2e23;
                    resize: none;
                    max-height: 120px;
                    overflow-y: auto;
                    line-height: 1.5;
                    font-family: inherit;
                    padding: 2px 0;
                }

                .msg-input::placeholder { color: #aac4b4; }

                .send-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: none;
                    background: #d1f0dd;
                    color: #86a895;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: background 0.2s, color 0.2s, transform 0.1s;
                }

                .send-btn.active {
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #fff;
                }

                .send-btn.active:hover { transform: scale(1.07); }
                .send-btn:disabled { cursor: not-allowed; }
            `}</style>
        </div>
    )
}