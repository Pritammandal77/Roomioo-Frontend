"use client";
import { fetchInterests } from "@/services/interest.api";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import InterestsCard from "@/components/ui/InterestsCard";
import { fetchCurrUserListings } from "@/services/rooms.api";
import ListingCard from "@/components/ui/ListingCard";
import { HomeIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

function Page() {
  const [outGoingInterests, setOutGoingInterests] = useState([]);
  const [inComingInterests, setInComingInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("incoming");
  const [mainTab, setMainTab] = useState("requests");
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchInterestsData = async () => {
      try {
        const res = await fetchInterests();
        setOutGoingInterests(res.data.outgoing || []);
        setInComingInterests(res.data.incoming || []);
        console.log(res);
      } catch (error) {
        toast.error("Something went wrong while fetching interests");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserListings = async () => {
      try {
        const res = await fetchCurrUserListings();
        console.log(res.data);
        setListings(res.data);
      } catch (error) {
        toast.error("Something went wrong while fetching listings");
      } finally {
        setLoading(false);
      }
    };

    fetchInterestsData();
    fetchUserListings();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 md:px-10 bg-linear-to-br from-green-50 via-white to-green-50">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            {mainTab === "requests" ? "Manage Requests" : "Your Listings"}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            {mainTab === "requests"
              ? "Handle incoming and outgoing roommate interests"
              : "View and manage your posted rooms"}
          </p>
        </div>

        {/* MAIN TABS */}
        <div className="relative flex bg-white/80 backdrop-blur border shadow-sm rounded-xl p-1 w-fit">
          <motion.div
            layout
            className="absolute top-1 bottom-1 w-1/2 bg-green-600 rounded-lg"
            animate={{
              x: mainTab === "requests" ? "0%" : "90%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          <button
            onClick={() => setMainTab("requests")}
            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-lg transition ${
              mainTab === "requests" ? "text-white" : "text-gray-600"
            }`}
          >
            Requests
          </button>

          <button
            onClick={() => setMainTab("listings")}
            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-lg transition ${
              mainTab === "listings" ? "text-white" : "text-gray-600"
            }`}
          >
            My Listings
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center text-gray-500 py-16 animate-pulse">
            Loading dashboard...
          </div>
        ) : (
          <motion.div
            key={mainTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {mainTab === "requests" ? (
              <>
                {/* SUB TABS */}
                <div className="relative flex bg-white border shadow-sm rounded-xl p-1 w-fit mt-2">
                  <motion.div
                    layout
                    className="absolute top-1 bottom-1 w-1/2 bg-green-600 rounded-lg"
                    animate={{
                      x: activeTab === "incoming" ? "0%" : "90%",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  <button
                    onClick={() => setActiveTab("incoming")}
                    className={`relative z-10 px-5 py-2 text-sm font-medium transition ${
                      activeTab === "incoming"
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Incoming
                  </button>

                  <button
                    onClick={() => setActiveTab("outgoing")}
                    className={`relative z-10 px-5 py-2 text-sm font-medium transition ${
                      activeTab === "outgoing"
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Outgoing
                  </button>
                </div>

                {/* REQUEST LIST */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-5 mt-5"
                >
                  {(activeTab === "incoming"
                    ? inComingInterests
                    : outGoingInterests
                  ).length > 0 ? (
                    (activeTab === "incoming"
                      ? inComingInterests
                      : outGoingInterests
                    ).map((item, index) => (
                      <InterestsCard key={index} item={item} type={activeTab} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white border rounded-2xl shadow-sm">
                      <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center mb-4 text-xl">
                        <InfoIcon />
                      </div>
                      <p className="text-gray-600 font-medium">
                        No {activeTab} requests yet
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        You’ll see them here when someone shows interest
                      </p>
                    </div>
                  )}
                </motion.div>
              </>
            ) : (
              /* LISTINGS */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5"
              >
                {listings.length > 0 ? (
                  listings.map((listing, index) => (
                    <ListingCard
                      key={listing._id}
                      listing={listing}
                      id={listing._id}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white border rounded-2xl shadow-sm text-center">
                    <div className="text-3xl mb-3 bg-green-200 p-3 rounded-full">
                      <HomeIcon />
                    </div>
                    <p className="text-gray-600 font-medium">No listings yet</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Start by posting your first room
                    </p>
                    <Link href="/rooms/new">
                      <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        + Create Listing
                      </button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Page;
