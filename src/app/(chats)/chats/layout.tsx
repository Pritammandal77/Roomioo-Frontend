"use client";
import ChatList from "@/components/chat/ChatList";
import { useAppSelector } from "@/lib/rtk/hooks";
import { usePathname, useRouter } from "next/navigation";

export default function ChatsLayout({ children }: any) {
  const pathname = usePathname();
  const isChatOpen = pathname !== "/chats";

  // to redirect user to home page , is user not logged In
  // const router = useRouter();
  // const user = useAppSelector((state: any) => state.user.userData);

  // setTimeout(() => {
  //   if (user == null) {
  //     router.push("/");
  //   }
  // }, 5000);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`
          w-full md:w-95 border-r border-gray-300 bg-white
          ${isChatOpen ? "hidden md:block" : "block"}
        `}
      >
        <ChatList /> {/* your chat list component */}
      </div>

      {/* CHAT PANEL */}
      <div
        className={`
          flex-1
          ${!isChatOpen ? "hidden md:flex" : "flex"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
