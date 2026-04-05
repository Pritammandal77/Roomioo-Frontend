// "use client";

// import { useAppSelector } from "@/lib/rtk/hooks";
// import { getPreference } from "@/services/preference.api";
// import { PreferenceData } from "@/types/preference";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// interface User {
//   _id: string;
//   fullName: string;
//   email: string;
//   mobileNumber: string;
//   gender: string;
//   dob: string;
//   profilePicture: string;
//   authProvider: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function Page() {
//   const router = useRouter();
//   const [userPreference, setUserPreference] = useState<PreferenceData | null>(
//     null,
//   );

//   const [isPreferenceAdded, setIsPreferenceAdded] = useState(false);

//   const user = useAppSelector((state): User | null => state.user.userData);

//   useEffect(() => {
//     const fetchPreference = async () => {
//       try {
//         console.log("preference API called");
//         const res = await getPreference();
//         setUserPreference(res.data);
//         console.log("preferece data", res);
//         if (res.data != null) {
//           setIsPreferenceAdded(true);
//         }
//       } catch (error) {
//         toast.error("something went wrong while fetching preference");
//       }
//     };

//     fetchPreference();
//   }, []);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-gray-500 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   const formatDate = (date: string): string => {
//     return new Date(date).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-green-100  to-emerald-100 pt-20">
//       {/* subtle background blobs */}
//       {/* <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/40 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-200/40 blur-3xl rounded-full" /> */}

//       <div className="max-w-6xl h-auto xl:h-[80%]  mx-auto px-6 py-10 relative z-10 grid md:grid-cols-3 gap-8">
//         {/* 🔥 LEFT SIDEBAR (PROFILE div) */}
//         <div className="flex flex-col gap-5">
//           <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
//             <div className="relative group">
//               <img
//                 src={user.profilePicture}
//                 className="w-28 h-28 rounded-full object-cover border-4 border-green-400"
//               />
//               <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
//             </div>

//             <h2 className="mt-4 text-xl font-semibold text-gray-800">
//               {user.fullName}
//             </h2>

//             <p className="text-sm text-gray-500">{user.email}</p>

//             <button
//               onClick={() => router.push("/preferences")}
//               className="mt-5 w-full py-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-400 text-white font-medium hover:scale-[1.02] transition shadow"
//             >
//               {isPreferenceAdded ? "Edit Preferences" : "Add Preferences"}
//             </button>

//             {/* mini info */}
//             <div className="mt-6 w-full space-y-3 text-sm">
//               <MiniItem label="Gender" value={user.gender} />
//               <MiniItem label="DOB" value={formatDate(user.dob)} />
//               <MiniItem label="Joined" value={formatDate(user.createdAt)} />
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Contact Information
//             </h3>

//             <div className="grid sm:grid-cols-2 gap-4 text-sm">
//               <Info label="Email" value={user.email} />
//               <Info label="Mobile" value={user.mobileNumber} />
//             </div>
//           </div>
//         </div>

//         <div className="md:col-span-2 space-y-6 h-full">
//           {/* CONTACT div */}

//           {/* PREFERENCES */}
//           {userPreference && (
//             <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition h-full">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                 Preferences 🌿
//               </h3>

//               <div className="grid sm:grid-cols-2 gap-5">
//                 <div title="Budget">
//                   <p className="text-green-600 font-bold">
//                     ₹{userPreference.budget.min} - ₹{userPreference.budget.max}
//                   </p>
//                 </div>

//                 <div title="Occupation">
//                   <Tag text={userPreference.occupation} />
//                 </div>

//                 <div title="Personality">
//                   <Tag text={userPreference.personality} />
//                 </div>

//                 {userPreference.workStyle && (
//                   <div title="Work Style">
//                     <Tag text={userPreference.workStyle} />
//                   </div>
//                 )}

//                 <div title="Lifestyle">
//                   <div className="flex flex-wrap gap-2">
//                     {userPreference.lifestyle.smoking && <Tag text="Smoking" />}
//                     {userPreference.lifestyle.drinking && (
//                       <Tag text="Drinking" />
//                     )}
//                     {userPreference.lifestyle.pets && <Tag text="Pets" />}
//                     <Tag text={userPreference.lifestyle.sleepSchedule} />
//                     <Tag text={userPreference.lifestyle.foodPreference} />
//                   </div>
//                 </div>

//                 <div title="Cleanliness">
//                   <div className="flex items-center gap-2">
//                     {[1, 2, 3, 4, 5].map((n) => (
//                       <div
//                         key={n}
//                         className={`w-4 h-4 rounded-full ${
//                           n <= userPreference.lifestyle.cleanliness
//                             ? "bg-green-500"
//                             : "bg-gray-200"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 <div title="Preferred Gender">
//                   <Tag text={userPreference.gender} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MiniItem({ label, value }: any) {
//   return (
//     <div className="flex justify-between text-gray-700">
//       <span>{label}</span>
//       <span className="font-medium capitalize text-gray-800">{value}</span>
//     </div>
//   );
// }

// function Info({ label, value }: any) {
//   return (
//     <div>
//       <p className="text-gray-700 text-xs">{label}</p>
//       <p className="text-gray-800 font-medium">{value}</p>
//     </div>
//   );
// }

// function div({ title, children }: any) {
//   return (
//     <div className="border border-gray-400 rounded-xl p-4 hover:shadow-sm transition bg-gray-50">
//       <p className="text-sm text-gray-700 mb-1">{title}</p>
//       {children}
//     </div>
//   );
// }

// function Tag({ text }: { text: string }) {
//   return (
//     <span className="px-3 py-1 text-xs rounded-full bg-green-200 text-green-800 capitalize">
//       {text}
//     </span>
//   );
// }






"use client";

import { useAppSelector } from "@/lib/rtk/hooks";
import { getPreference } from "@/services/preference.api";
import { PreferenceData } from "@/types/preference";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface User {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  dob: string;
  profilePicture: string;
  createdAt: string;
}

export default function Page() {
  const router = useRouter();

  const [userPreference, setUserPreference] =
    useState<PreferenceData | null>(null);
  const [isPreferenceAdded, setIsPreferenceAdded] = useState(false);

  const user = useAppSelector((state: any) => state.user.userData);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const res = await getPreference();
        setUserPreference(res.data);
        if (res.data) setIsPreferenceAdded(true);
      } catch (error) {
        toast.error("Failed to load preferences");
      }
    };

    fetchPreference();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen pt-20 bg-linear-to-br from-green-100 via-[#c7f9c6] to-emerald-100 text-gray-800">
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* 🔥 TOP PROFILE STRIP */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">

          <div className="flex items-center gap-5">
            <img
              src={user.profilePicture}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-400"
            />

            <div>
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Joined {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition shadow"
            >
              Dashboard
            </button>

            <button
              onClick={() => router.push("/edit-profile")}
              className="px-4 py-2 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* 🔥 MAIN LAYOUT */}
        <div className="grid lg:grid-cols-4 gap-6">

          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">

            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-lg text-gray-700 font-semibold">Basic Info</h3>
              <Info label="Gender" value={user.gender} />
              <Info label="DOB" value={formatDate(user.dob)} />
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-lg text-gray-700 font-semibold">Contact</h3>
              <Info label="Email" value={user.email} />
              <Info label="Mobile" value={user.mobileNumber} />
            </div>

            <button
              onClick={() => router.push("/preferences")}
              className="w-full py-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-400 text-white font-semibold hover:scale-[1.02] transition shadow"
            >
              {isPreferenceAdded ? "Edit Preferences" : "Add Preferences"}
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-6">

            {userPreference && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    Your Preferences
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                    <GlassCard title="Budget">
                      ₹{userPreference.budget.min} - ₹{userPreference.budget.max}
                    </GlassCard>

                    <GlassCard title="Occupation">
                      {userPreference.occupation}
                    </GlassCard>

                    <GlassCard title="Personality">
                      {userPreference.personality}
                    </GlassCard>

                    {userPreference.workStyle && (
                      <GlassCard title="Work Style">
                        {userPreference.workStyle}
                      </GlassCard>
                    )}

                    <GlassCard title="Food">
                      {userPreference.lifestyle.foodPreference}
                    </GlassCard>

                    <GlassCard title="Sleep">
                      {userPreference.lifestyle.sleepSchedule}
                    </GlassCard>

                    <GlassCard title="Cleanliness">
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div
                            key={n}
                            className={`w-3 h-3 rounded-full ${
                              n <= userPreference.lifestyle.cleanliness
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </GlassCard>

                    <GlassCard title="Lifestyle">
                      <div className="flex flex-wrap gap-2">
                        {userPreference.lifestyle.smoking && <Tag text="Smoking" />}
                        {userPreference.lifestyle.drinking && <Tag text="Drinking" />}
                        {userPreference.lifestyle.pets && <Tag text="Pets" />}
                      </div>
                    </GlassCard>

                    <GlassCard title="Preferred Gender">
                      {userPreference.gender}
                    </GlassCard>

                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Info({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

function GlassCard({ title, children }: any) {
  return (
    <div className="bg-white/80 border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <p className="text-xs text-gray-500 mb-1">{title}</p>
      <div className="font-semibold text-[13px] md:text-[16px] text-gray-800">{children}</div>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
      {text}
    </span>
  );
}