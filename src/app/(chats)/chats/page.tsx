import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden bg-linear-to-br from-green-50 via-white to-emerald-50">

      {/* 🌿 Soft background glow */}
      <div className="absolute w-100 h-100 bg-green-200/30 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-75 h-75 bg-emerald-300/20 blur-3xl rounded-full bottom-10 right-10" />

      {/* Main Card */}
      <div className="
        relative z-10
        flex flex-col items-center text-center
        px-10 py-12 rounded-3xl
        bg-white/70 backdrop-blur-xl
        border border-green-100
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        max-w-md
      ">

        {/* Icon */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="w-9 h-9"
            >
              <path
                d="M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-xl animate-pulse" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-green-950 tracking-tight">
          Select a chat
        </h2>

        {/* Subtext */}
        <p className="text-sm text-green-600 mt-2 leading-relaxed max-w-xs">
          Choose a conversation from the sidebar to start messaging and stay connected.
        </p>

        {/* Action hint */}
        <div className="mt-6 text-xs text-green-500 flex items-center gap-1">
          <span><ArrowLeft size={15}/></span>
          <span>Pick a chat to begin</span>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-2 mt-6">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
}