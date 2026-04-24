// "use client";

// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { updateStatus } from "@/services/interest.api";
// import { useState } from "react";
// import UpdateInterestStatus from "./UpdateInterestStatus";
// import { createOrFetchChat } from "@/services/chat.api";

// function InterestsCard({ item, type }: any) {
//   const router = useRouter();

//   const user =
//     type === "incoming" ? item?.interestedUser : item?.propertyLister;

//   console.log("interests", user)
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<
//     "accepted" | "rejected" | null
//   >(null);
//   const [loading, setLoading] = useState(false);

//   // Only open modal (NO API CALL HERE)
//   const handleStatusChange = (status: "accepted" | "rejected") => {
//     setSelectedStatus(status);
//     setOpenModal(true);
//   };

//   const confirmStatusChange = async () => {
//     if (!selectedStatus) return;

//     try {
//       setLoading(true);

//       await updateStatus({
//         interestId: item._id,
//         updatedStatus: selectedStatus,
//       });

//       setOpenModal(false);
//       setSelectedStatus(null);

//       router.refresh();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isAccept = selectedStatus === "accepted";

//   const handleCreateOrFetchChat = async (id: string) => {
//     try {
//       const res = await createOrFetchChat(id);
//       router.push(`/chats/${res.data._id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         whileHover={{ y: -4 }}
//         className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl p-5 flex flex-col gap-4"
//       >
//         {/* TOP */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img
//               src={user?.profilePicture}
//               className="w-11 h-11 rounded-full object-cover ring-2 ring-green-100"
//             />

//             <div>
//               <h3 className="font-semibold text-gray-800 text-sm">
//                 {user?.fullName}
//               </h3>
//               <p className="text-xs text-gray-400">{user?.email}</p>
//             </div>
//           </div>

//           <span
//             className={`text-[12px] px-2 py-1 rounded-full font-medium ${
//               item?.status === "pending"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : item?.status === "accepted"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-600"
//             }`}
//           >
//             {item?.status}
//           </span>
//         </div>

//         {/* PROPERTY */}
//         <div className="flex justify-between items-center bg-green-50 rounded-xl px-4 py-3">
//           <div>
//             <p className="text-sm font-semibold text-gray-800">
//               ₹ {item?.property?.rent}
//             </p>
//             <p className="text-xs text-gray-500 line-clamp-1">
//               {item?.property?.description}
//             </p>
//           </div>

//           <button
//             onClick={() => router.push(`/listings/${item?.property?._id}`)}
//             className="text-xs bg-green-600 cursor-pointer text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
//           >
//             View Property Details
//           </button>
//         </div>

//         {/* MESSAGE */}
//         <p className="text-sm text-gray-600 leading-relaxed">{item?.message}</p>

//         {/* BOTTOM */}
//         <div className="flex items-center justify-between">
//           <span className="text-[11px] text-gray-400">
//             {new Date(item?.createdAt).toLocaleDateString("en-IN")}
//           </span>

//           <div className="flex items-center gap-2">
//             <div className="flex gap-3">
//               <button
//                 onClick={() => handleCreateOrFetchChat(user._id)}
//                 className="text-md text-green-800 bg-green-200 rounded-xl px-3 py-1 hover:underline cursor-pointer"
//               >
//                 Chat
//               </button>
//               <button
//                 onClick={() => router.push(`/profile/${user?._id}`)}
//                 className="text-md text-blue-800 bg-blue-200 rounded-xl px-3 py-1 hover:underline cursor-pointer"
//               >
//                 Visit Profile
//               </button>
//             </div>

//             {type === "incoming" && item?.status === "pending" && (
//               <>
//                 <button
//                   onClick={() => handleStatusChange("accepted")}
//                   className="text-xs bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
//                 >
//                   Accept
//                 </button>

//                 <button
//                   onClick={() => handleStatusChange("rejected")}
//                   className="text-xs bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition"
//                 >
//                   Reject
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* MODAL */}
//       {openModal && (
//         <UpdateInterestStatus
//           open={openModal}
//           status={selectedStatus}
//           loading={loading}
//           onClose={() => {
//             setOpenModal(false);
//             setSelectedStatus(null);
//           }}
//           onConfirm={confirmStatusChange}
//         />
//       )}
//     </>
//   );
// }

// export default InterestsCard;


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

  console.log("interests", user);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "accepted" | "rejected" | null
  >(null);
  const [loading, setLoading] = useState(false);

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

  const statusConfig = {
    pending: {
      label: "Pending",
      dot: "bg-amber-400",
      badge: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    accepted: {
      label: "Accepted",
      dot: "bg-emerald-400",
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    rejected: {
      label: "Rejected",
      dot: "bg-red-400",
      badge: "bg-red-50 text-red-600 border border-red-200",
    },
  };

  const status =
    statusConfig[item?.status as keyof typeof statusConfig] ??
    statusConfig.pending;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -3,
          boxShadow: "0 20px 40px -12px rgba(16, 122, 76, 0.12)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 4px 24px -4px rgba(16, 122, 76, 0.08)" }}
      >
        {/* Subtle top accent line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400" />

        <div className="p-6 flex flex-col gap-5">
          {/* HEADER: Avatar + Name + Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={user?.profilePicture}
                  className="w-12 h-12 rounded-2xl object-cover"
                  style={{ boxShadow: "0 0 0 3px #d1fae5" }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {user?.fullName}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
              </div>
            </div>

            {/* Status badge */}
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${status.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-gradient-to-r from-transparent via-green-100 to-transparent" />

          {/* PROPERTY BLOCK */}
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50/60 border border-green-100 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p>
                  {}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] text-emerald-600 font-medium">
                    ₹
                  </span>
                  <span className="text-lg font-bold text-gray-900 tracking-tight">
                    {item?.property?.rent}
                  </span>
                  <span className="text-xs text-gray-400">/mo</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {item?.property?.description}
                </p>
              </div>

              <button
                onClick={() => router.push(`/listings/${item?.property?._id}`)}
                className="shrink-0 flex items-center gap-1.5 text-xs font-medium bg-white text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                View
              </button>
            </div>
          </div>

          {/* MESSAGE */}
          {item?.message && (
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <span className="text-emerald-400 font-bold mr-1">"</span>
              {item?.message}
              <span className="text-emerald-400 font-bold ml-1">"</span>
            </p>
          )}

          {/* FOOTER */}
          <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
            {/* Date */}
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"
                />
              </svg>
              {new Date(item?.createdAt).toLocaleDateString("en-IN")}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Chat */}
              <button
                onClick={() => handleCreateOrFetchChat(user._id)}
                className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                Chat
              </button>

              {/* Visit Profile */}
              <button
                onClick={() => router.push(`/profile/${user?._id}`)}
                className="flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Profile
              </button>

              {/* Accept / Reject — incoming + pending only */}
              {type === "incoming" && item?.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatusChange("accepted")}
                    className="flex items-center gap-1 text-xs font-semibold bg-emerald-600 text-white px-3 py-1.5 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all duration-150 cursor-pointer"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatusChange("rejected")}
                    className="flex items-center gap-1 text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl hover:bg-gray-200 active:scale-95 transition-all duration-150 cursor-pointer"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Reject
                  </button>
                </>
              )}
            </div>
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