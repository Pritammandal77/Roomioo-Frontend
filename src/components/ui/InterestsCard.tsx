"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { updateStatus } from "@/services/interest.api";
import { useState } from "react";
import UpdateInterestStatus from "./UpdateInterestStatus";
import { createOrFetchChat } from "@/services/chat.api";

function InterestsCard({ item, type }: any) {
  const router = useRouter();

  const user =
    type === "incoming" ? item?.interestedUser : item?.propertyLister;

  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "accepted" | "rejected" | null
  >(null);
  const [loading, setLoading] = useState(false);

  // Only open modal (NO API CALL HERE)
  const handleStatusChange = (status: "accepted" | "rejected") => {
    setSelectedStatus(status);
    setOpenModal(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedStatus) return;

    try {
      setLoading(true);

      await updateStatus({
        interestId: item._id,
        updatedStatus: selectedStatus,
      });

      setOpenModal(false);
      setSelectedStatus(null);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isAccept = selectedStatus === "accepted";

  const handleCreateOrFetchChat = async (id: string) => {
    try {
      const res = await createOrFetchChat(id);
      router.push(`/chats/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl p-5 flex flex-col gap-4"
      >
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePicture}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-green-100"
            />

            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                {user?.fullName}
              </h3>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>

          <span
            className={`text-[12px] px-2 py-1 rounded-full font-medium ${
              item?.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : item?.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {item?.status}
          </span>
        </div>

        {/* PROPERTY */}
        <div className="flex justify-between items-center bg-green-50 rounded-xl px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              ₹ {item?.property?.rent}
            </p>
            <p className="text-xs text-gray-500 line-clamp-1">
              {item?.property?.description}
            </p>
          </div>

          <button
            onClick={() => router.push(`/listings/${item?.property?._id}`)}
            className="text-xs bg-green-600 cursor-pointer text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
          >
            View Property Details
          </button>
        </div>

        {/* MESSAGE */}
        <p className="text-sm text-gray-600 leading-relaxed">{item?.message}</p>

        {/* BOTTOM */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            {new Date(item?.createdAt).toLocaleDateString("en-IN")}
          </span>

          <div className="flex items-center gap-2">
            <div className="flex gap-3">
              <button
                onClick={() => handleCreateOrFetchChat(user._id)}
                className="text-md text-green-800 bg-green-200 rounded-xl px-3 py-1 hover:underline cursor-pointer"
              >
                Chat
              </button>
              <button
                onClick={() => router.push(`/profile/${user?._id}`)}
                className="text-md text-blue-800 bg-blue-200 rounded-xl px-3 py-1 hover:underline cursor-pointer"
              >
                Visit Profile
              </button>
            </div>

            {type === "incoming" && item?.status === "pending" && (
              <>
                <button
                  onClick={() => handleStatusChange("accepted")}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleStatusChange("rejected")}
                  className="text-xs bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      {openModal && (
        <UpdateInterestStatus
          open={openModal}
          status={selectedStatus}
          loading={loading}
          onClose={() => {
            setOpenModal(false);
            setSelectedStatus(null);
          }}
          onConfirm={confirmStatusChange}
        />
      )}
    </>
  );
}

export default InterestsCard;
