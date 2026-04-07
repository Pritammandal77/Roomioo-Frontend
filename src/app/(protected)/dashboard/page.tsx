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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Requests Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-3 mb-6 bg-green-50 p-2 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("incoming")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === "incoming"
                    ? "bg-green-600 text-white shadow"
                    : "text-green-700"
                }`}
              >
                Incoming
              </button>

              <button
                onClick={() => setActiveTab("outgoing")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === "outgoing"
                    ? "bg-green-600 text-white shadow"
                    : "text-green-700"
                }`}
              >
                Outgoing
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {activeTab === "incoming" && (
                <>
                  <h2 className="text-xl font-semibold text-green-700">
                    Incoming Requests
                  </h2>

                  {inComingInterests.length > 0 ? (
                    inComingInterests.map((item, index) => (
                      <InterestsCard key={index} item={item} type="incoming" />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No incoming requests
                    </p>
                  )}
                </>
              )}

              {activeTab === "outgoing" && (
                <>
                  <h2 className="text-xl font-semibold text-green-700">
                    Outgoing Requests
                  </h2>

                  {outGoingInterests.length > 0 ? (
                    outGoingInterests.map((item, index) => (
                      <InterestsCard key={index} item={item} type="outgoing" />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No outgoing requests
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
