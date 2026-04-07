"use client";
import { fetchInterests } from "@/services/interest.api";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

function Page() {
  const [outGoingInterests, setOutGoingInterests] = useState([]);
  const [inComingInterests, setInComingInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterestsData = async () => {
      try {
        const res = await fetchInterests();
        setOutGoingInterests(res.data.outgoing || []);
        setInComingInterests(res.data.incoming || []);
      } catch (error) {
        toast.error("Something went wrong while fetching interests");
      } finally {
        setLoading(false);
      }
    };

    fetchInterestsData();
  }, []);

  const Card = ({ item, type }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white/70 backdrop-blur-lg border border-green-100 shadow-md rounded-2xl p-4 flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">
          {item?.propertyLister?.name || "User"}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            type === "incoming"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {type === "incoming" ? "Incoming" : "Outgoing"}
        </span>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2">
        {item?.message || "No message provided"}
      </p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">
          Property ID: {item?.propertyId || "N/A"}
        </span>

        {type === "incoming" && (
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Accept
            </button>
            <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Reject
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 px-4 md:px-10 bg-linear-to-br from-green-50 via-white to-green-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Requests Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">

            {/* Incoming */}
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Incoming Requests
              </h2>

              <div className="flex flex-col gap-4">
                {inComingInterests.length > 0 ? (
                  inComingInterests.map((item, index) => (
                    <Card key={index} item={item} type="incoming" />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    No incoming requests
                  </p>
                )}
              </div>
            </div>

            {/* Outgoing */}
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Outgoing Requests
              </h2>

              <div className="flex flex-col gap-4">
                {outGoingInterests.length > 0 ? (
                  outGoingInterests.map((item, index) => (
                    <Card key={index} item={item} type="outgoing" />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    No outgoing requests
                  </p>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
