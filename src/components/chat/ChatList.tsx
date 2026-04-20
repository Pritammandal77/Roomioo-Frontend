"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAllChatsList } from "@/services/chat.api";
import { useAppSelector } from "@/lib/rtk/hooks";
import { useSocket } from "@/hooks/useSocket";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import RoomiooLoader from "../loaders/RoomiooLoader";

export default function ChatList() {
  const router = useRouter();
  const user = useAppSelector((state: any) => state.user.userData);
  const socket = useSocket(user?._id);

  const [chats, setChats] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isChatsLoading, setIsChatsLoding] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        setIsChatsLoding(true);
        const res = await fetchAllChatsList();
        setChats(res.data);
      } catch {
        toast.error("something went wrong while fetching chats");
      } finally {
        setIsChatsLoding(false);
      }
    };

    fetchAllChats();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("online-users", setOnlineUsers);

    socket.on("message-received", (message: any) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === message.chat._id
            ? { ...chat, latestMessage: message, updatedAt: message.createdAt }
            : chat,
        ),
      );
    });

    return () => {
      socket.off("online-users");
      socket.off("message-received");
    };
  }, [socket]);

  const getOther = (chat: any) =>
    chat.users.find((u: any) => u._id !== user._id);

  return (
    <>
      <div className="h-full flex flex-col bg-linear-to-br from-green-50 via-white to-emerald-50 relative">
        {/* HEADER */}
        <div className="px-5 py-4 backdrop-blur flex items-center justify-between bg-white/70 border-b border-green-100 shadow-sm sticky top-0 z-10">
          <Link href={"/"}>
            <h1 className="flex items-center justify-center gap-1 text-md font-semibold text-black tracking-tight">
              <ArrowLeft size={16} />
              <span>Home</span>
            </h1>
          </Link>

          <h1 className="text-md font-semibold text-green-900 tracking-tight">
            Chats
          </h1>
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {chats?.map((chat) => {
            const other = getOther(chat);
            const isOnline = onlineUsers.includes(other._id);
            const isMe = chat.latestMessage?.sender?._id === user._id;

            return (
              <div
                key={chat._id}
                onClick={() => router.push(`/chats/${chat._id}`)}
                className="
            group flex items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer
            hover:bg-white hover:shadow-md transition-all duration-200
            active:scale-[0.98]
          "
              >
                {/* AVATAR */}
                <div className="relative shrink-0">
                  <img
                    src={other.profilePicture || "/avatar.png"}
                    className="
                w-12 h-12 rounded-full object-cover
                ring-2 ring-green-100 group-hover:ring-green-300 transition
              "
                  />

                  {/* ONLINE DOT */}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-70"></span>
                    </span>
                  )}
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0">
                  {/* NAME + TIME */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-950 truncate">
                      {other.fullName}
                    </span>

                    <span className="text-[11px] text-green-400 shrink-0 ml-2">
                      {formatDistanceToNow(new Date(chat.updatedAt), {
                        addSuffix: false,
                      })}
                    </span>
                  </div>

                  {/* LAST MESSAGE */}
                  <p className="text-sm text-green-600 truncate mt-0.5 flex items-center gap-1">
                    {chat.latestMessage ? (
                      <>
                        {isMe && (
                          <span className="text-green-400 font-medium">
                            You:
                          </span>
                        )}
                        <span className="truncate">
                          {chat.latestMessage.content}
                        </span>
                      </>
                    ) : (
                      <span className="italic text-green-300">
                        Start chatting
                      </span>
                    )}
                  </p>
                </div>

                {/* OPTIONAL RIGHT ICON (HOVER EFFECT) */}
                <div className="opacity-0 group-hover:opacity-100 transition">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {!isChatsLoading && (
          <div className="flex xl:hidden w-full md:w-95 h-screen">
            <RoomiooLoader textContent="Chats loading..." isAddBg={false} />

            <div>Loading Chats</div>
          </div>
        )}
      </div>
    </>
  );
}
