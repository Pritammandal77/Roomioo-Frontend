"use client";

import FilterPanel from "@/components/ui/FilterPanel";
import ListingCard from "@/components/ui/ListingCard";
import { fetchAllListings, filterListings } from "@/services/rooms.api";
import { FiltersType } from "@/types/rooms";
import { FilterIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
  const [allListingsData, setAllListingsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isShowFiltersPanel, setIsShowFiltersPanel] = useState<boolean>(false);

  const [filters, setFilters] = useState<FiltersType>({
    minRent: "",
    maxRent: "",

    city: "",
    area: "",

    roomType: [],

    AC: undefined,
    parking: undefined,
    refrigerator: undefined,
    isPersonalRoomAvailable: undefined,

    furnishedLevel: "",

    // preferences
    smoking: undefined,
    drinking: undefined,
    pets: undefined,

    sleepSchedule: "",
    foodPreference: "",
    preferredGender: "",
    occupation: "",
    workStyle: "",
  });

  const fetchListings = async () => {
    try {
      const res = await fetchAllListings();
      setAllListingsData(res.data || []);
      console.log("rooms data", res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFilters((prev) => ({
        ...prev,
        [name]: checked ? true : undefined,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRoomType = (type: string) => {
    setFilters((prev) => {
      const exists = prev.roomType.includes(type);

      return {
        ...prev,
        roomType: exists
          ? prev.roomType.filter((t) => t !== type)
          : [...prev.roomType, type],
      };
    });
  };

  const applyFilters = async () => {
    try {
      setLoading(true);

      const res = await filterListings(filters);

      console.log("FILTER RES:", res);

      setAllListingsData(res.data || []);
    } catch (error) {
      toast.error("Filter failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    setFilters({
      minRent: "",
      maxRent: "",
      city: "",
      area: "",
      roomType: [],
      AC: undefined,
      parking: undefined,
      refrigerator: undefined,
      furnishedLevel: "",
      isPersonalRoomAvailable: undefined,
      smoking: undefined,
      drinking: undefined,
      pets: undefined,
      sleepSchedule: "",
      foodPreference: "",
      preferredGender: "",
      occupation: "",
      workStyle: "",
    });

    await fetchListings();
  };

  return (
    <div className="min-h-screen pt-20 xl:px-15 bg-linear-to-br from-green-50 via-white to-green-100 px-6 py-10 relative">
      {/* <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-gray-800">
          Find Your Perfect Room
        </h1>
      </div> */}

      <div className="w-full flex flex-col xl:flex-row gap-6">
        {/* filters for xl screens */}
        <div className="hidden xl:block xl:w-[25%]">
          <div className="custom-scrollbar fixed top-20 left-10 w-[25%] h-[calc(100vh-80px)] overflow-y-auto bg-white rounded-xl shadow-sm p-4">
            <FilterPanel
              filters={filters}
              handleChange={handleChange}
              handleRoomType={handleRoomType}
              applyFilters={applyFilters}
              handleClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* menu for sm to md screens */}
        <div className="xl:hidden">
          <div>
            <button
              className="bg-black text-gray-200 text-[13px] px-3 py-1 rounded-md flex items-center justify-center gap-2"
              onClick={() => setIsShowFiltersPanel((prev) => !prev)}
            >
              <FilterIcon size={16} />
              Apply Filters
            </button>
          </div>
        </div>

        {/* LISTINGS */}
        <div className="xl:w-[75%]">
          {loading ? (
            <p>Loading...</p>
          ) : allListingsData.length === 0 ? (
            <p>No rooms found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {allListingsData.map((listing) => (
                <ListingCard
                  key={listing._id}
                  id={listing._id}
                  listing={listing}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* for showing filter panel on mobile & tablet screens */}
      <div
        className={`xl:hidden w-full h-screen flex flex-col bg-white fixed top-0 right-0 pt-16 overflow-y-scroll
        transform transition-transform duration-300 ease-in-out
  ${isShowFiltersPanel ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-3 pb-6">
          <p className="font-semibold">Filters</p>
          <X onClick={() => setIsShowFiltersPanel((prev) => !prev)} />
        </div>
        <FilterPanel
          filters={filters}
          handleChange={handleChange}
          handleRoomType={handleRoomType}
          applyFilters={applyFilters}
          handleClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}

export default Page;

// old working code, without filters feature
// "use client";

// import ListingCard from "@/components/ui/ListingCard";
// import { fetchAllListings } from "@/services/rooms.api";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";

// function Page() {
//   const [allListingsData, setAllListingsData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await fetchAllListings();
//         setAllListingsData(res.data);
//         console.log(res.data);
//       } catch (error) {
//         toast.error("Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   return (
//     <div className="min-h-screen pt-20 xl:px-15 bg-linear-to-br from-green-50 via-white to-green-100 px-6 py-10">
//       {/* HEADER */}
//       <div className="mb-8 ">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Find Your Perfect Room 🏡
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Explore verified listings and find your ideal roommate match
//         </p>
//       </div>

//       <div className="w-full flex">
//         {/* filter panel */}
//         <div className="xl:w-[25%]">

//         </div>

//         {/* listings cards */}
//         <div className="xl:w-[75%]">
//           {loading ? (
//             <div className="text-center text-gray-500 mt-20">
//               Loading listings...
//             </div>
//           ) : allListingsData.length === 0 ? (
//             <div className="text-center text-gray-500 mt-20">
//               No rooms available 😢
//             </div>
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-6">
//               {allListingsData.map((listing) => (
//                 <ListingCard
//                   key={listing._id}
//                   id={listing._id}
//                   listing={listing}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;
