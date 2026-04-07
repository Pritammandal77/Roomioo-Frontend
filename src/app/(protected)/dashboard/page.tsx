"use client";
import { fetchInterests } from "@/services/interest.api";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import InterestsCard from "@/components/ui/InterestsCard";

function Page() {
  const [outGoingInterests, setOutGoingInterests] = useState([]);
  const [inComingInterests, setInComingInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("incoming");

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

    fetchInterestsData();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 md:px-10 bg-linear-to-br from-green-50 via-white to-green-100">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Requests</h1>
            <p className="text-gray-500 text-sm">
              Manage your incoming and outgoing interests
            </p>
          </div>

          {/* STATS */}
          <div className="flex gap-3">
            <div className="bg-white shadow-sm border rounded-xl px-4 py-2 text-sm">
              <p className="text-gray-500">Incoming</p>
              <p className="font-semibold text-green-600">
                {inComingInterests.length}
              </p>
            </div>

            <div className="bg-white shadow-sm border rounded-xl px-4 py-2 text-sm">
              <p className="text-gray-500">Outgoing</p>
              <p className="font-semibold text-green-600">
                {outGoingInterests.length}
              </p>
            </div>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="relative flex bg-white border shadow-sm rounded-xl p-1 w-fit">
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
            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === "incoming" ? "text-white" : "text-gray-600"
            }`}
          >
            Incoming
          </button>

          <button
            onClick={() => setActiveTab("outgoing")}
            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === "outgoing" ? "text-white" : "text-gray-600"
            }`}
          >
            Outgoing
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading requests...
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5"
          >
            {(activeTab === "incoming" ? inComingInterests : outGoingInterests)
              .length > 0 ? (
              (activeTab === "incoming"
                ? inComingInterests
                : outGoingInterests
              ).map((item, index) => (
                <InterestsCard key={index} item={item} type={activeTab} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  📭
                </div>
                <p className="text-gray-500 text-sm">
                  No {activeTab} requests yet
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Page;
