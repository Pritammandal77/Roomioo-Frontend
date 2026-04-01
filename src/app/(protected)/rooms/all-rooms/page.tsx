"use client";

import ListingCard from "@/components/ui/ListingCard";
import { fetchAllListings } from "@/services/rooms.api";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
  const [allListingsData, setAllListingsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetchAllListings();
        setAllListingsData(res.data);
        console.log(res.data)
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen pt-20 xl:px-30 bg-linear-to-br from-green-50 via-white to-green-100 px-6 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Find Your Perfect Room 🏡
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Explore verified listings and find your ideal roommate match
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center text-gray-500 mt-20">
          Loading listings...
        </div>
      ) : allListingsData.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No rooms available 😢
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {allListingsData.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;