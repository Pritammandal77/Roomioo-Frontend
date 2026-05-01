"use client";

import { useAppSelector } from "@/lib/rtk/hooks";
import { getPreference } from "@/services/preference.api";
import { PreferenceData } from "@/types/preference";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LucideBadgeQuestionMark } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const [userPreference, setUserPreference] = useState<PreferenceData | null>(
    null,
  );
  const [isPreferenceAdded, setIsPreferenceAdded] = useState(false);

  const user = useAppSelector((state: any) => state.user.userData);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const res = await getPreference();
        console.log("preferences", res.data);
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
    <div className="min-h-screen pt-20 xl:pt-30 bg-linear-to-br from-green-100 via-[#c7f9c6] to-emerald-100 text-gray-800">
      <div className="max-w-7xl mx-auto p-3 space-y-3 md:space-y-6 md:px-20">
        {/* TOP PROFILE STRIP */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
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

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-[50%] md:w-auto px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition shadow"
              >
                Dashboard
              </button>

              <button
                onClick={() => router.push("/profile/edit")}
                className="w-[50%] md:w-auto px-4 py-2 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition"
              >
                Edit Profile
              </button>
            </div>

            <button
              onClick={() => router.push("/preferences")}
              className="w-full xl:hidden py-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold hover:scale-[1.02] transition shadow"
            >
              {isPreferenceAdded ? "Edit Preferences" : "Add Preferences"}
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid xl:grid-cols-4 gap-0 xl:gap-6">
          {/* SIDEBAR */}
          <div className="lg:col-span-3 xl:col-span-1 space-y-3 md:space-y-6">
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-lg text-gray-700 font-semibold">
                Basic Info
              </h3>
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
              className="hidden : xl:inline w-full py-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold hover:scale-[1.02] transition shadow"
            >
              {isPreferenceAdded ? "Edit Preferences" : "Add Preferences"}
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-3 md:space-y-6">
            {userPreference ? (
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
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-10 py-15 shadow-sm flex flex-col items-center justify-center text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <LucideBadgeQuestionMark size={28} />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800">
                  No Preferences Added
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
                  You haven’t set your preferences yet. Add your lifestyle and
                  choices to get better matches.
                </p>

                {/* CTA */}
                <button
                  onClick={() => router.push("/preferences")}
                  className="mt-6 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition"
                >
                  Setup Preferences
                </button>
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
