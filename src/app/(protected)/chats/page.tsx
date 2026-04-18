"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSocket } from "@/hooks/useSocket"
import { fetchAllChatsList } from "@/services/chat.api"
import { formatDistanceToNow } from "date-fns"

interface ChatUser {
    _id: string
    fullName: string
    profilePicture?: string
}

interface LatestMessage {
    _id: string
    content: string
    sender: ChatUser
    createdAt: string
}

interface Chat {
    _id: string
    users: ChatUser[]
    latestMessage?: LatestMessage
    updatedAt: string
}

// Replace with your actual auth hook/store
const useCurrentUser = () => {
    // e.g. return useAuthStore(state => state.user)
    return { _id: "currentUserId", fullName: "You" }
}

export default function ChatsPage() {
    const router = useRouter()
    const currentUser = useCurrentUser()
    const socket = useSocket(currentUser?._id)

    const [chats, setChats] = useState<Chat[]>([])
    const [loading, setLoading] = useState(true)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchAllChatsList()
                setChats(data.data)
            } catch (err) {
                console.error("Failed to load chats", err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    useEffect(() => {
        if (!socket) return

        socket.on("online-users", (users: string[]) => setOnlineUsers(users))

        // Update chat list when a new message arrives
        socket.on("message-received", (message: LatestMessage & { chat: { _id: string } }) => {
            setChats(prev =>
                prev.map(chat =>
                    chat._id === (message.chat?._id || message.chat)
                        ? { ...chat, latestMessage: message, updatedAt: message.createdAt }
                        : chat
                ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            )
        })

        return () => {
            socket.off("online-users")
            socket.off("message-received")
        }
    }, [socket])

    const getOtherUser = (chat: Chat): ChatUser => {
        return chat.users.find(u => u._id !== currentUser?._id) ?? chat.users[0]
    }

    const filteredChats = chats.filter(chat => {
        const other = getOtherUser(chat)
        return other.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <div className="chats-root">
            {/* ── Sidebar ── */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="brand">
                        <span className="brand-icon">🏠</span>
                        <span className="brand-name">Roomio</span>
                    </div>
                    <p className="brand-sub">Your conversations</p>
                </div>

                <div className="search-wrap">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        className="search-input"
                        placeholder="Search conversations…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="chat-list">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="skeleton-row">
                                <div className="skeleton-avatar" />
                                <div className="skeleton-lines">
                                    <div className="skeleton-line wide" />
                                    <div className="skeleton-line narrow" />
                                </div>
                            </div>
                        ))
                    ) : filteredChats.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">💬</span>
                            <p>No conversations yet</p>
                            <span>Find a flatmate and start chatting!</span>
                        </div>
                    ) : (
                        filteredChats.map(chat => {
                            const other = getOtherUser(chat)
                            const isOnline = onlineUsers.includes(other._id)
                            const isMe = chat.latestMessage?.sender?._id === currentUser?._id

                            return (
                                <button
                                    key={chat._id}
                                    className="chat-row"
                                    onClick={() => router.push(`/chats/${chat._id}`)}
                                >
                                    <div className="avatar-wrap">
                                        {other.profilePicture ? (
                                            <img src={other.profilePicture} alt={other.fullName} className="avatar" />
                                        ) : (
                                            <div className="avatar-fallback">
                                                {other.fullName.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        {isOnline && <span className="online-dot" />}
                                    </div>

                                    <div className="chat-info">
                                        <div className="chat-info-top">
                                            <span className="chat-name">{other.fullName}</span>
                                            {chat.latestMessage && (
                                                <span className="chat-time">
                                                    {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: false })}
                                                </span>
                                            )}
                                        </div>
                                        <p className="chat-preview">
                                            {chat.latestMessage
                                                ? `${isMe ? "You: " : ""}${chat.latestMessage.content}`
                                                : "No messages yet"}
                                        </p>
                                    </div>
                                </button>
                            )
                        })
                    )}
                </div>
            </aside>

            {/* ── Empty right panel ── */}
            <main className="main-empty">
                <div className="empty-chat-panel">
                    <div className="empty-chat-icon">🏡</div>
                    <h2>Select a conversation</h2>
                    <p>Choose a chat from the left to start messaging your potential flatmate.</p>
                </div>
            </main>

            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .chats-root {
                    display: flex;
                    height: 100vh;
                    font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
                    background: #f0faf4;
                }

                /* ── Sidebar ── */
                .sidebar {
                    width: 360px;
                    min-width: 320px;
                    background: #fff;
                    border-right: 1.5px solid #d1f0dd;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .sidebar-header {
                    padding: 28px 24px 16px;
                    border-bottom: 1.5px solid #e8f8ef;
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 4px;
                }

                .brand-icon { font-size: 22px; }

                .brand-name {
                    font-size: 22px;
                    font-weight: 800;
                    color: #16a34a;
                    letter-spacing: -0.5px;
                }

                .brand-sub {
                    font-size: 13px;
                    color: #86a895;
                    font-weight: 400;
                }

                /* ── Search ── */
                .search-wrap {
                    position: relative;
                    margin: 16px 16px 8px;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 16px;
                    height: 16px;
                    color: #86a895;
                }

                .search-input {
                    width: 100%;
                    padding: 10px 12px 10px 38px;
                    border-radius: 12px;
                    border: 1.5px solid #d1f0dd;
                    background: #f0faf4;
                    font-size: 14px;
                    color: #1a2e23;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .search-input:focus { border-color: #22c55e; }
                .search-input::placeholder { color: #aac4b4; }

                /* ── Chat List ── */
                .chat-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 8px 0;
                }

                .chat-list::-webkit-scrollbar { width: 4px; }
                .chat-list::-webkit-scrollbar-thumb { background: #d1f0dd; border-radius: 4px; }

                .chat-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    padding: 12px 16px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    transition: background 0.15s;
                    border-radius: 0;
                }

                .chat-row:hover { background: #f0faf4; }

                /* ── Avatar ── */
                .avatar-wrap {
                    position: relative;
                    flex-shrink: 0;
                }

                .avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #d1f0dd;
                }

                .avatar-fallback {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: #fff;
                    font-size: 18px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .online-dot {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 11px;
                    height: 11px;
                    border-radius: 50%;
                    background: #22c55e;
                    border: 2px solid #fff;
                }

                /* ── Chat Info ── */
                .chat-info { flex: 1; min-width: 0; }

                .chat-info-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-bottom: 3px;
                }

                .chat-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: #1a2e23;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .chat-time {
                    font-size: 11px;
                    color: #86a895;
                    white-space: nowrap;
                    margin-left: 8px;
                    flex-shrink: 0;
                }

                .chat-preview {
                    font-size: 13px;
                    color: #6b8c78;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* ── Skeleton ── */
                .skeleton-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                }

                .skeleton-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: linear-gradient(90deg, #e8f8ef 25%, #d1f0dd 50%, #e8f8ef 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.4s infinite;
                    flex-shrink: 0;
                }

                .skeleton-lines { flex: 1; }

                .skeleton-line {
                    height: 12px;
                    border-radius: 6px;
                    background: linear-gradient(90deg, #e8f8ef 25%, #d1f0dd 50%, #e8f8ef 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.4s infinite;
                    margin-bottom: 8px;
                }

                .skeleton-line.wide { width: 70%; }
                .skeleton-line.narrow { width: 45%; }

                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                /* ── Empty State ── */
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 24px;
                    color: #86a895;
                    gap: 8px;
                    text-align: center;
                }

                .empty-icon { font-size: 40px; }
                .empty-state p { font-size: 15px; font-weight: 600; color: #4a7a5c; }
                .empty-state span { font-size: 13px; }

                /* ── Main Empty Panel ── */
                .main-empty {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f0faf4;
                }

                .empty-chat-panel {
                    text-align: center;
                    color: #6b8c78;
                }

                .empty-chat-icon { font-size: 56px; margin-bottom: 16px; }

                .empty-chat-panel h2 {
                    font-size: 22px;
                    font-weight: 700;
                    color: #1a2e23;
                    margin-bottom: 8px;
                }

                .empty-chat-panel p {
                    font-size: 14px;
                    max-width: 280px;
                    line-height: 1.6;
                }
            `}</style>
        </div>
    )
}