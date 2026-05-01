"use client";

import { editProfile } from "@/services/auth.api";
import { EditProfile } from "@/types/user";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Camera, User, Calendar, Phone, Instagram, Info } from "lucide-react";
import { useAppSelector } from "@/lib/rtk/hooks";
import RoomiooLoader from "@/components/loaders/RoomiooLoader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const user = useAppSelector((state: any) => state.user.userData);
  const router = useRouter();

  const [formData, setFormData] = useState<EditProfile>({
    fullName: "",
    dob: "",
    mobileNumber: "",
    gender: "male",
    instagramLink: "",
    aboutUser: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        // Ensure date is YYYY-MM-DD for the input field
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        mobileNumber: user.mobileNumber || "",
        gender: user.gender || "male",
        instagramLink: user.instagramLink || "",
        aboutUser: user.aboutUser || "",
      });

      // Set the existing profile picture as initial preview
      if (user.profilePicture) {
        setPreview(user.profilePicture);
      }
    }
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setIsLoading(true);
    if (formData.fullName.length > 30) {
      setError("Full Name must be less than 30 characters");
      setIsSubmitting(false);
      return;
    }

    try {
      // Only send the file if a NEW one was selected
      const res = await editProfile({
        ...formData,
        profilePicture: profilePicture || undefined,
      });
      toast.success("Profile updated successfully!");
      router.push("/");
    } catch (err: any) {
      alert("Update failed.");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-18 bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-emerald-100">
          {/* Header Banner */}
          <div className="bg-emerald-600 h-32 w-full relative">
            <div className="absolute -bottom-16 left-10">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-emerald-300 bg-gray-100">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-1 right-1 bg-emerald-500 p-2 rounded-full text-white cursor-pointer hover:bg-emerald-600 transition-colors shadow-md">
                  <Camera size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-20 px-10 pb-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
              <p className="text-gray-500">
                Your information is pre-filled from your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                    <User size={16} className="text-emerald-500" /> Full Name *
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50"
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                    <Calendar size={16} className="text-emerald-500" /> Date of
                    Birth *
                  </label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                    <Phone size={16} className="text-emerald-500" /> Mobile
                    Number
                  </label>
                  <input
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                  <Instagram size={16} className="text-emerald-500" /> Instagram
                  Link
                </label>
                <input
                  name="instagramLink"
                  value={formData.instagramLink}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                  <Info size={16} className="text-emerald-500" /> About You
                </label>
                <textarea
                  name="aboutUser"
                  value={formData.aboutUser}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50 resize-none"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-2.5 cursor-pointer rounded-lg font-semibold bg-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-green-600 cursor-pointer text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-emerald-300 shadow-md transition-all"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isLoading && (
        <RoomiooLoader
          isAddBg={true}
          textContent="Updating data, please wait..."
        />
      )}
    </>
  );
}
