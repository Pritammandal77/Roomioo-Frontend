"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import {
  fetchAllMessages,
  sendNewMessage,
  markMessagesAsSeen,
} from "@/services/chat.api";
import { useAppSelector } from "@/lib/rtk/hooks";
import Image from "next/image";
import { Clock, SendHorizonalIcon } from "lucide-react";

interface ChatUser {
  _id: string;
  fullName: string;
  profilePicture?: string;
}

interface Message {
  _id: string;
  content: string;
  sender: ChatUser;
  chat: { _id: string } | string;
  seenBy: ({ _id: string } | string)[];
  createdAt: string;
  pending?: boolean; // optimistic flag
}

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();

  const user = useAppSelector((s: any) => s.user.userData);
  const socket = useSocket(user?._id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [otherUser, setOtherUser] = useState<ChatUser | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false); // prevent double-send

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ── Load messages ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!chatId || !user?._id) return;

    setLoading(true);
    const res = fetchAllMessages(chatId)
      .then((res) => {
        console.log("messages", res);
        setMessages(res.data || []);
        const other = res.data?.find((m: Message) => m.sender._id !== user._id);
        if (other) setOtherUser(other.sender);
      })
      .catch((err) => console.error("Failed to fetch messages", err))
      .finally(() => setLoading(false));
  }, [chatId, user?._id]);

  useEffect(() => {
    if (!socket || !chatId || !user?._id || loading) return;
    socket.emit("mark-seen", { chatId, userId: user._id }); // real-time
    markMessagesAsSeen(chatId); // DB persist
  }, [loading, socket, chatId, user?._id]);

  // ── Socket events ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!socket || !chatId || !user?._id) return;

    socket.emit("join-chat", chatId);

    socket.on("message-received", (msg) => {
      setMessages((prev) => [...prev, msg]);
      socket.emit("mark-seen", { chatId, userId: user._id }); // real-time
      markMessagesAsSeen(chatId); // DB persist
    });
    socket.on(
      "messages-seen",
      ({ chatId: cId, userId }: { chatId: string; userId: string }) => {
        setMessages((prev) =>
          prev.map((m) =>
            (typeof m.chat === "object" ? m.chat._id : m.chat) === cId
              ? { ...m, seenBy: [...new Set([...(m.seenBy || []), userId])] }
              : m,
          ),
        );
      },
    );

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));

    return () => {
      socket.emit("leave-chat", chatId);
      socket.off("message-received");
      socket.off("messages-seen");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [socket, chatId, user?._id]);

  // ── Auto scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Typing handler ─────────────────────────────────────────────────────────
  const handleTyping = useCallback(() => {
    if (!socket) return;
    socket.emit("typing", chatId);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", chatId);
    }, 1500);
  }, [socket, chatId]);

  // ── Send message ───────────────────────────────────────────────────────────
  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending || !socket) return;

    // Optimistic message — appears instantly
    const optimistic: Message = {
      _id: `temp-${Date.now()}`,
      content: trimmed,
      sender: {
        _id: user._id,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
      chat: chatId,
      seenBy: [user._id],
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setMessages((prev) => [...prev, optimistic]);
    setInput("");
    socket.emit("stop-typing", chatId);

    try {
      setSending(true);
      const res = await sendNewMessage({ chatId, message: trimmed });
      const saved: Message = res.data;

      // Replace optimistic with real saved message
      setMessages((prev) =>
        prev.map((m) => (m._id === optimistic._id ? saved : m)),
      );

      // Broadcast to other user via socket
      socket.emit("new-message", saved);
    } catch (err) {
      console.error("Failed to send message", err);
      // Remove failed optimistic message
      setMessages((prev) => prev.filter((m) => m._id !== optimistic._id));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  // Enter key support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Fixed seen check — seenBy can be array of objects OR strings
  const isSeen = (msg: Message) =>
    msg.seenBy?.some(
      (id) => (typeof id === "object" ? id._id : id) === otherUser?._id,
    );

  const formatTime = (t: string) =>
    new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ── Date divider helper ────────────────────────────────────────────────────
  const isSameDay = (a: string, b: string) =>
    new Date(a).toDateString() === new Date(b).toDateString();

  const formatDateLabel = (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString([], {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col w-full h-screen bg-green-50 font-sans">
      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-green-100 shadow-sm">
        <button
          onClick={() => router.push("/chats")}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-5 h-5"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Avatar */}
        <div className="relative shrink-0">
          {otherUser?.profilePicture ? (
            <img
              src={otherUser.profilePicture}
              alt={otherUser.fullName}
              className="w-10 h-10 rounded-full object-cover border-2 border-green-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-green-600 text-white font-bold text-base flex items-center justify-center">
              {otherUser?.fullName?.charAt(0).toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-green-950 text-[15px] leading-tight">
            {otherUser?.fullName || "Loading…"}
          </span>
          {isTyping && (
            <span className="text-xs text-green-500 font-medium">typing…</span>
          )}
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div className="flex-1 overflow-y-auto px-5 xl:px-20 py-4 space-y-1">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-green-400">
            <div className="w-7 h-7 border-[3px] border-green-200 border-t-green-500 rounded-full animate-spin" />
            <span className="text-sm">Loading messages…</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-green-400">
            <span className="text-4xl">👋</span>
            <p className="text-sm font-medium text-green-700">
              No messages yet
            </p>
            <p className="text-xs text-green-300">
              Say hi to your potential flatmate!
            </p>
          </div>
        )}

        {/* Messages */}
        {!loading &&
          messages.map((msg, idx) => {
            const isMine = msg.sender._id === user?._id;
            const seen = isSeen(msg);
            const showDate =
              idx === 0 ||
              !isSameDay(messages[idx - 1].createdAt, msg.createdAt);

            return (
              <div key={msg._id}>
                {/* Date divider */}
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="text-[11px] font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      {formatDateLabel(msg.createdAt)}
                    </span>
                  </div>
                )}

                <div
                  className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1`}
                >
                  {/* Other user avatar */}
                  {/* {!isMine && (
                    <Image
                     src={msg.sender.profilePicture || ""}
                      alt="Image"
                      height={20}
                      width={20}
                      />
                  )} */}

                  <div
                    className={`
                      px-4 py-2.5 rounded-2xl max-w-[68%] text-sm leading-relaxed
                      ${msg.pending ? "opacity-60" : "opacity-100"}
                      ${
                        isMine
                          ? "bg-linear-to-br from-green-400 to-green-600 text-white rounded-br-sm"
                          : "bg-white border border-green-100 text-green-950 rounded-bl-sm"
                      }
                    `}
                  >
                    <p>{msg.content}</p>

                    {/* Time + seen receipt */}
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 ${isMine ? "text-green-100" : "text-green-600"}`}
                    >
                      <span className="text-[10px]">
                        {formatTime(msg.createdAt)}
                      </span>
                      {isMine && (
                        <span className="text-[11px]">
                          {msg.pending ? <Clock size={13} className="text-black font-bold"/> : seen ? "✓✓" : "✓"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-1">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-green-400 to-green-600 text-white text-xs font-bold flex items-center justify-center mr-2 self-end shrink-0">
              {otherUser?.fullName?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div className="bg-white border border-green-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
              {/* ✅ inline keyframes avoids Tailwind delay class issues */}
              <span
                className="w-2 h-2 bg-green-400 rounded-full"
                style={{ animation: "bounce 1.2s infinite ease-in-out 0ms" }}
              />
              <span
                className="w-2 h-2 bg-green-400 rounded-full"
                style={{ animation: "bounce 1.2s infinite ease-in-out 200ms" }}
              />
              <span
                className="w-2 h-2 bg-green-400 rounded-full"
                style={{ animation: "bounce 1.2s infinite ease-in-out 400ms" }}
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT BAR ── */}
      <div className="px-4 py-3 border-t border-green-100 bg-white">
        <div className="flex items-center gap-2 bg-green-50 border border-green-100 focus-within:border-green-400 rounded-full px-4 py-2 transition-colors">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleTyping();
            }}
            onKeyDown={handleKeyDown} // ✅ Enter to send
            className="flex-1 bg-transparent outline-none text-sm text-green-950 placeholder:text-gray-500"
            placeholder="Type a message…"
          />
          <button
            onClick={send}
            disabled={!input.trim() || sending}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all
              ${
                input.trim()
                  ? "bg-linear-to-br from-green-400 to-green-600 text-white hover:scale-105"
                  : "bg-green-200 text-green-700 cursor-not-allowed"
              }
            `}
          >
            <SendHorizonalIcon/>
          </button>
        </div>
      </div>

      {/* ✅ Bounce keyframe for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
