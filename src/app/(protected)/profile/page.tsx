"use client";

import { useAppSelector } from "@/lib/rtk/hooks";
import { getPreference } from "@/services/preference";
import { PreferenceData } from "@/types/preference";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  dob: string;
  profilePicture: string;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const router = useRouter();
  const [userPreference, setUserPreference] = useState<PreferenceData | null>(
    null,
  );

  const [isPreferenceAdded, setIsPreferenceAdded] = useState(false);

  const user = useAppSelector((state): User | null => state.user.userData);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const res = await getPreference();
        setUserPreference(res.data);

        if (res.data != null) {
          setIsPreferenceAdded(true);
        }
        
      } catch (error) {
        toast.error("something went wrong while fetching preference");
      }
    };

    fetchPreference();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-white text-gray-900">
      {/* Top Section */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <img
            src={user.profilePicture}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
          />

          {/* User Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <h1 className="text-3xl font-semibold">{user.fullName}</h1>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/preferences/add")}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                  {isPreferenceAdded ? <span>Edit</span> : <span>Add</span>}{" "}
                  Preferences
                </button>

              </div>
            </div>

            {/* Stats Row (Instagram style feel) */}
            <div className="flex gap-8 mt-6 text-sm">
              <div>
                <p className="font-semibold">Gender</p>
                <p className="text-gray-500 capitalize">{user.gender}</p>
              </div>

              <div>
                <p className="font-semibold">Joined</p>
                <p className="text-gray-500">{formatDate(user.createdAt)}</p>
              </div>

              <div>
                <p className="font-semibold">Auth</p>
                <p className="text-gray-500 capitalize">{user.authProvider}</p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6">
              <p className="font-medium">Contact Info</p>
              <p className="text-gray-600 text-sm mt-1">{user.email}</p>
              <p className="text-gray-600 text-sm">{user.mobileNumber}</p>
              <p className="text-gray-500 text-sm mt-2">
                DOB: {formatDate(user.dob)}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-10" />

        {/* Preferences Section */}
        {userPreference && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Your Preferences 🌿
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Budget Card */}
              <Card title="Budget">
                <p className="text-green-600 font-semibold text-lg">
                  ₹{userPreference.budget.min} - ₹{userPreference.budget.max}
                </p>
              </Card>

              {/* Occupation */}
              <Card title="Occupation">
                <Tag text={userPreference.occupation} />
              </Card>

              {/* Personality */}
              <Card title="Personality">
                <Tag text={userPreference.personality} />
              </Card>

              {/* Work Style */}
              {userPreference.workStyle && (
                <Card title="Work Style">
                  <Tag text={userPreference.workStyle} />
                </Card>
              )}

              {/* Lifestyle */}
              <Card title="Lifestyle">
                <div className="flex flex-wrap gap-2">
                  {userPreference.lifestyle.smoking && <Tag text="Smoking" />}
                  {userPreference.lifestyle.drinking && <Tag text="Drinking" />}
                  {userPreference.lifestyle.pets && <Tag text="Pets" />}
                  <Tag text={userPreference.lifestyle.sleepSchedule} />
                  <Tag text={userPreference.lifestyle.foodPreference} />
                </div>
              </Card>

              {/* Cleanliness */}
              <Card title="Cleanliness">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className={`w-4 h-4 rounded-full ${
                        n <= userPreference.lifestyle.cleanliness
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {userPreference.lifestyle.cleanliness}/5
                  </span>
                </div>
              </Card>

              {/* Gender Preference */}
              <Card title="Preferred Gender">
                <Tag text={userPreference.gender} />
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: any) {
  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      {children}
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 capitalize">
      {text}
    </span>
  );
}
