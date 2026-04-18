// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSocket } from "@/hooks/useSocket";
// import { fetchAllChatsList } from "@/services/chat.api";
// import { formatDistanceToNow } from "date-fns";
// import { useAppSelector } from "@/lib/rtk/hooks";

// interface ChatUser {
//   _id: string;
//   fullName: string;
//   profilePicture?: string;
// }

// interface LatestMessage {
//   _id: string;
//   content: string;
//   sender: ChatUser;
//   createdAt: string;
//   chat: { _id: string };
// }

// interface Chat {
//   _id: string;
//   users: ChatUser[];
//   latestMessage?: LatestMessage;
//   updatedAt: string;
// }

// export default function ChatsPage() {
//   const router = useRouter();

//   // ✅ Redux selector inside the component (not outside!)
//   const user = useAppSelector((state: any) => state.user.userData);
//   const socket = useSocket(user?._id);

//   const [chats, setChats] = useState<Chat[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // ── Load chats ──────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await fetchAllChatsList();
//         setChats(data.data);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   // ── Socket events ───────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("online-users", (users: string[]) => setOnlineUsers(users));

//     socket.on("message-received", (message: LatestMessage) => {
//       const incomingChatId = message.chat?._id || message.chat;
//       setChats((prev) =>
//         prev
//           .map((chat) =>
//             chat._id === incomingChatId
//               ? {
//                   ...chat,
//                   latestMessage: message,
//                   updatedAt: message.createdAt,
//                 }
//               : chat,
//           )
//           .sort(
//             (a, b) =>
//               new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
//           ),
//       );
//     });

//     return () => {
//       socket.off("online-users");
//       socket.off("message-received");
//     };
//   }, [socket]);

//   // ── Helpers ─────────────────────────────────────────────────────────────────
//   const getOtherUser = (chat: Chat): ChatUser =>
//     chat.users.find((u) => u._id !== user?._id) ?? chat.users[0];

//   const filteredChats = chats.filter((chat) => {
//     const other = getOtherUser(chat);
//     return other.fullName.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-[#e6f7ee] via-[#f0fff7] to-[#ecfdf5]">
//       {/* ── Sidebar ── */}
//       <aside className="w-[360px] bg-white/70 backdrop-blur-xl border-r border-green-100 flex flex-col shadow-xl">
//         {/* Header */}
//         <div className="px-6 pt-6 pb-4 border-b border-green-100">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
//               🏠
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-gray-800">Roomio</h1>
//               <p className="text-xs text-gray-400">Your conversations</p>
//             </div>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="p-4">
//           <div className="relative">
//             <input
//               className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-green-400 transition"
//               placeholder="Search chats..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//           </div>
//         </div>

//         {/* Chat List */}
//         <div className="flex-1 overflow-y-auto px-2 space-y-1">
//           {filteredChats.map((chat) => {
//             const other = getOtherUser(chat);
//             const isOnline = onlineUsers.includes(other._id);
//             const isMe = chat.latestMessage?.sender?._id === user?._id;

//             return (
//               <button
//                 key={chat._id}
//                 onClick={() => router.push(`/chats/${chat._id}`)}
//                 className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-green-50 transition-all group"
//               >
//                 {/* Avatar */}
//                 <div className="relative">
//                   <img
//                     src={other.profilePicture || "/avatar.png"}
//                     className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
//                   />
//                   {isOnline && (
//                     <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between">
//                     <h2 className="text-sm font-semibold text-gray-800 truncate">
//                       {other.fullName}
//                     </h2>
//                     <span className="text-[11px] text-gray-400">
//                       {formatDistanceToNow(new Date(chat.updatedAt))}
//                     </span>
//                   </div>

//                   <p className="text-xs text-gray-500 truncate">
//                     {chat.latestMessage
//                       ? `${isMe ? "You: " : ""}${chat.latestMessage.content}`
//                       : "Start conversation..."}
//                   </p>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </aside>

//       {/* Empty state */}
//       <main className="flex-1 hidden md:flex items-center justify-center">
//         <div className="text-center text-gray-400">
//           <div className="text-6xl mb-4">💬</div>
//           <h2 className="text-xl font-bold text-gray-700">Select a chat</h2>
//         </div>
//       </main>
//     </div>
//   );
// }


export default function Page() {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center">
      <div className="text-gray-400 text-center">
        <h2 className="text-xl font-bold">Select a chat</h2>
      </div>
    </div>
  );
}