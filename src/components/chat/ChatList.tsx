"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAllChatsList } from "@/services/chat.api";
import { useAppSelector } from "@/lib/rtk/hooks";
import { useSocket } from "@/hooks/useSocket";
import { formatDistanceToNow } from "date-fns";

export default function ChatList() {
  const router = useRouter();
  const user = useAppSelector((state: any) => state.user.userData);
  const socket = useSocket(user?._id);

  const [chats, setChats] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchAllChatsList().then((res) => setChats(res.data));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("online-users", setOnlineUsers);

    socket.on("message-received", (message: any) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === message.chat._id
            ? { ...chat, latestMessage: message, updatedAt: message.createdAt }
            : chat
        )
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
    <div className="h-full flex flex-col">

      <div className="p-4 font-bold text-lg border-b">Chats</div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const other = getOther(chat);
          const isOnline = onlineUsers.includes(other._id);
          const isMe = chat.latestMessage?.sender?._id === user._id;

          return (
            <div
              key={chat._id}
              onClick={() => router.push(`/chats/${chat._id}`)}
              className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={other.profilePicture || "/avatar.png"}
                  className="w-12 h-12 rounded-full"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold">{other.fullName}</span>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(chat.updatedAt))}
                  </span>
                </div>

                <p className="text-sm text-gray-500 truncate">
                  {chat.latestMessage
                    ? `${isMe ? "You: " : ""}${chat.latestMessage.content}`
                    : "Start chatting"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}