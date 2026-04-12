export default function ListingDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 animate-pulse px-4 xl:px-0">
      <div className="max-w-6xl mx-auto">

        {/* IMAGE SLIDER */}
        <div className="w-full h-80 bg-gray-300 rounded-2xl" />

        <div className="grid md:grid-cols-3 gap-6 mt-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-6">

            {/* PRICE CARD */}
            <div className="bg-white rounded-2xl shadow-sm flex flex-col md:flex-row">
              
              <div className="w-full md:w-[70%] p-5 space-y-3">
                <div className="h-6 w-40 bg-gray-300 rounded" />
                <div className="h-4 w-60 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>

              <div className="md:w-[30%] p-5 flex flex-col gap-3">
                <div className="h-10 bg-gray-300 rounded-xl" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="h-5 w-32 bg-gray-300 rounded" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-4/6" />
            </div>

            {/* AMENITIES */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="h-5 w-40 bg-gray-300 rounded mb-4" />

              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-gray-200 rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* PREFERENCES */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-5">

              <div className="h-5 w-48 bg-gray-300 rounded" />

              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-xl" />
                ))}

                {/* CLEANLINESS BAR */}
                <div className="col-span-full space-y-2">
                  <div className="h-3 w-32 bg-gray-300 rounded" />
                  <div className="h-2 w-full bg-gray-200 rounded-full" />
                </div>
              </div>

              {/* HABITS */}
              <div className="space-y-3">
                <div className="h-5 w-40 bg-gray-300 rounded" />

                <div className="flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-gray-200 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* OWNER */}
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-4">
              <div className="h-5 w-28 bg-gray-300 rounded" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full" />
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-gray-300 rounded" />
                  <div className="h-2 w-36 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="h-8 w-32 bg-gray-200 rounded-xl ml-auto" />
            </div>

            {/* CTA */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="h-10 bg-gray-300 rounded-xl" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}