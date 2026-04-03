"use client";

import ListingCard from "@/components/ui/ListingCard";
import { fetchAllListings, filterListings } from "@/services/rooms.api";
import { FiltersType } from "@/types/user";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
  const [allListingsData, setAllListingsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchListings();
  }, []);

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

      setAllListingsData(res.data || []); // ✅ correct
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
    <div className="min-h-screen pt-20 xl:px-15 bg-linear-to-br from-green-50 via-white to-green-100 px-6 py-10">
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-gray-800">
          Find Your Perfect Room 🏡
        </h1>
      </div>

      <div className="w-full flex gap-6">
        {/* FILTER */}
        <div className="xl:w-[25%] bg-white p-5 rounded-2xl shadow-md h-fit sticky top-24 space-y-6">
          <h2 className="text-xl font-semibold">Filters</h2>

          {/* 💰 RENT */}
          <div>
            <p className="text-sm font-medium mb-2">Budget</p>
            <div>
              <input
                type="number"
                name="minRent"
                placeholder="Min"
                value={filters.minRent}
                onChange={handleChange}
                className="w-full border p-2 mb-2 rounded-lg"
              />
              <input
                type="number"
                name="maxRent"
                placeholder="Max"
                value={filters.maxRent}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>

          {/* 📍 LOCATION */}
          <div>
            <p className="text-sm font-medium mb-2">Location</p>
            <input
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={handleChange}
              className="w-full border p-2 mb-2 rounded-lg"
            />
            <input
              name="area"
              placeholder="Area"
              value={filters.area}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* 🏠 ROOM TYPE */}
          <div>
            <p className="text-sm font-medium mb-2">Room Type</p>
            {["1 BHK", "2 BHK", "Single room", "PG"].map((type) => (
              <label key={type} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.roomType.includes(type)}
                  onChange={() => handleRoomType(type)}
                />
                {type}
              </label>
            ))}
          </div>

          {/* 🛋 AMENITIES */}
          <div>
            <p className="text-sm font-medium mb-2">Amenities</p>

            {[
              { name: "AC", label: "AC" },
              { name: "parking", label: "Parking" },
              { name: "refrigerator", label: "Fridge" },
              { name: "isPersonalRoomAvailable", label: "Personal Room" },
            ].map((item) => (
              <label key={item.name} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  name={item.name}
                  checked={filters[item.name as keyof FiltersType] === true}
                  onChange={handleChange}
                />
                {item.label}
              </label>
            ))}
          </div>

          {/* 🛋 FURNISHED */}
          <div>
            <p className="text-sm font-medium mb-2">Furnished</p>
            <select
              name="furnishedLevel"
              value={filters.furnishedLevel}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Select</option>
              <option value="full furnished">Full</option>
              <option value="semi furnished">Semi</option>
              <option value="non furnished">None</option>
            </select>
          </div>

          {/* 👤 PREFERENCES */}
          <div>
            <p className="text-sm font-medium mb-2">Lifestyle</p>

            {[
              { name: "smoking", label: "Smoking" },
              { name: "drinking", label: "Drinking" },
              { name: "pets", label: "Pets" },
            ].map((item) => (
              <label key={item.name} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  name={item.name}
                  checked={filters[item.name as keyof FiltersType] === true}
                  onChange={handleChange}
                />
                {item.label}
              </label>
            ))}
          </div>

          {/* ⚡ DROPDOWNS */}
          <div className="space-y-2">
            <select
              name="preferredGender"
              value={filters.preferredGender}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select
              name="occupation"
              value={filters.occupation}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Occupation</option>
              <option value="student">Student</option>
              <option value="working professional">Working</option>
            </select>

            <select
              name="workStyle"
              value={filters.workStyle}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Work Style</option>
              <option value="WFH">WFH</option>
              <option value="WFO">WFO</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* 🚀 BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              className="w-full bg-green-600 text-white p-2 rounded-lg"
            >
              Apply
            </button>

            <button
              onClick={handleClearFilters}
              className="w-full border p-2 rounded-lg"
            >
              Clear
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
            <div className="grid grid-cols-3 gap-4">
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
