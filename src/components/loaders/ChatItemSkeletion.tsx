export default function ChatItemSkeleton() {
  return (
    <div
      className="
        flex items-center gap-3 px-3 py-3 rounded-2xl
        bg-white animate-pulse
      "
    >
      {/* AVATAR */}
      <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0" />

      {/* TEXT */}
      <div className="flex-1 min-w-0 space-y-2">
        
        {/* NAME + TIME */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/3" />
          <div className="h-3 bg-gray-300 rounded w-10" />
        </div>

        {/* LAST MESSAGE */}
        <div className="h-3 bg-gray-300 rounded w-3/4" />
      </div>

      {/* RIGHT ICON */}
      <div className="w-4 h-4 bg-gray-300 rounded opacity-50" />
    </div>
  );
}