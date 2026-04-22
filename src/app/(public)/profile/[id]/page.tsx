"use client";
import { getUserById } from "@/services/auth.api";
import { PreferenceData } from "@/types/preference";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "../../../../types/user";
import { MessageCircleCode } from "lucide-react";
import { createOrFetchChat } from "@/services/chat.api";

function page() {
  const { id } = useParams();

  const [userData, setUserData] = useState<User | null>(null);
  const [userPreference, setUserPreference] = useState<PreferenceData | null>(
    null,
  );
  
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setUserData(res.data?.user);
        setUserPreference(res.data?.preference);
        console.log("user data", res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleCreateOrFetchChat = async (id: string) => {
    try {
      const res = await createOrFetchChat(id);
      router.push(`/chats/${res.data._id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen pt-20 xl:pt-30 bg-linear-to-br from-green-100 via-[#c7f9c6] to-emerald-100 text-gray-800">
      <div className="max-w-7xl mx-auto p-3 space-y-3 md:space-y-6">
        {/* TOP PROFILE STRIP */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <img
              src={userData?.profilePicture}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-400"
            />

            <div>
              <h1 className="text-2xl font-bold">{userData?.fullName}</h1>
              <p className="text-sm text-gray-500">{userData?.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Joined {formatDate(userData ? userData.createdAt : "")}
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 MAIN LAYOUT */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-3 md:space-y-6">
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-lg text-gray-700 font-semibold">
                Basic Info
              </h3>
              <Info label="Gender" value={userData?.gender} />
              {userData && (
                <Info label="DOB" value={formatDate(userData.dob)} />
              )}
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-lg text-gray-700 font-semibold">Contact</h3>
              <Info label="Email" value={userData?.email} />
              <Info label="Mobile" value={userData?.mobileNumber} />
            </div>

            <button
              className="bg-green-500 font-semibold flex items-center justify-center gap-3 w-full py-3 rounded-xl"
              onClick={() => handleCreateOrFetchChat(id as string)}
            >
              <MessageCircleCode size={18} /> Start Chat
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-3 md:space-y-6">
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
                      ₹{userPreference.budget.min} - ₹
                      {userPreference.budget.max}
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
                        {userPreference.lifestyle.smoking && (
                          <Tag text="Smoking" />
                        )}
                        {userPreference.lifestyle.drinking && (
                          <Tag text="Drinking" />
                        )}
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

export default page;

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
      <div className="font-semibold text-[13px] md:text-[16px] text-gray-800">
        {children}
      </div>
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
