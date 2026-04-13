export default function PreferencesPageSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex justify-center animate-pulse">
      <div className="w-full max-w-4xl mt-20 mb-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 space-y-10">

        {/* HEADER */}
        <div className="space-y-4">
          <div className="h-8 w-72 bg-gray-300 rounded" />
          <div className="h-4 w-96 bg-gray-200 rounded" />
          <div className="h-1 w-20 bg-green-300 rounded-full" />
        </div>

        {/* FORM */}
        <div className="space-y-10">

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>

          {/* Section Skeleton */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Title */}
              <div className="h-4 w-32 bg-gray-300 rounded" />

              {/* Pills */}
              <div className="flex flex-wrap gap-3">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-10 w-24 bg-gray-200 rounded-full"
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Lifestyle checkboxes */}
          <div className="space-y-4">
            <div className="h-4 w-40 bg-gray-300 rounded" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded-xl"
                />
              ))}
            </div>
          </div>

          {/* Cleanliness Slider */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-3 w-24 bg-gray-300 rounded" />
              <div className="h-3 w-10 bg-green-300 rounded" />
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full" />
          </div>

          {/* Gender Select */}
          <div className="h-12 bg-gray-200 rounded-xl" />

          {/* Submit Button */}
          <div className="h-12 bg-green-300 rounded-xl shadow-md" />
        </div>
      </div>
    </div>
  );
}