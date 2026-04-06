
export default function ListingCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
      
      {/* IMAGE */}
      <div className="h-52 bg-gray-300" />

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        
        {/* TITLE */}
        <div className="h-4 bg-gray-300 rounded w-3/4" />

        {/* LOCATION */}
        <div className="h-3 bg-gray-300 rounded w-1/2" />

        {/* RENT */}
        <div className="h-4 bg-gray-300 rounded w-1/3 mt-2" />

        {/* BUTTON */}
        <div className="h-10 bg-gray-300 rounded-lg mt-4" />
      </div>
    </div>
  );
}