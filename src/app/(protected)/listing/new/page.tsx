"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  IndianRupee,
  MapPin,
  Building2,
  Moon,
  Sparkles,
  Utensils,
  Users,
  Briefcase,
  Home,
  Image as ImageIcon,
  Cigarette,
  Wine,
  PawPrint,
  Text,
} from "lucide-react";
import { RoomForm } from "@/types/rooms";
import { toast } from "sonner";
import RoomiooLoader from "@/components/loaders/RoomiooLoader";

export default function Page() {
  const [locationMode, setLocationMode] = useState<"auto" | "manual" | null>(
    null,
  );

  const [form, setForm] = useState<RoomForm>({
    rent: "",
    description: "",
    city: "",
    area: "",
    coordinates: [],
    smoking: false,
    drinking: false,
    sleepSchedule: "early",
    cleanliness: 3,
    foodPreference: "veg",
    pets: false,
    preferredGender: "male",
    occupation: "student",
    workStyle: "WFO",
    roomType: "",
    AC: false,
    refrigerator: false,
    parking: false,
    furnishedLevel: "",
    isPersonalRoomAvailable: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [locationSet, setLocationSet] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    let selectedFiles = Array.from(files);

    if (selectedFiles.length + images.length > 4) {
      alert("You can upload maximum 4 images");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    for (let file of selectedFiles) {
      if (!validTypes.includes(file.type)) {
        alert("Only JPG, JPEG, PNG allowed");
        return;
      }
    }

    const newImages = [...images, ...selectedFiles];
    setImages(newImages);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);

    setImages(updatedImages);
    setPreviewUrls(updatedPreviews);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]:
          name === "rent" || name === "cleanliness" ? Number(value) : value,
      }));
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Save coordinates
          setForm((prev) => ({
            ...prev,
            coordinates: [lng, lat],
          }));

          // Reverse geocode (GET CITY + AREA)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          );

          const data = await res.json();

          const address = data.address;

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.state_district ||
            "";

          const area =
            address.suburb || address.neighbourhood || address.hamlet || "";

          // Auto-fill city & area
          setForm((prev) => ({
            ...prev,
            city,
            area,
          }));

          setLocationSet(true);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch address");
        }
      },
      () => {
        toast.info("Location access denied");
      },
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("At least 1 image is required");
      return;
    }

    if (images.length > 4) {
      toast.error("Max 4 images allowed");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "coordinates") {
          formData.append("coordinates", JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      images.forEach((img) => {
        formData.append("pictures", img);
      });

      const res = await axiosInstance.post(
        "/api/rooms/list-new-room",
        formData,
      );

      toast.success("Room listed successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen py-20 bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-3 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white border border-green-100 shadow-xl rounded-3xl p-8 space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">
              List Your <span className="text-green-700">Space</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Add details to find the perfect roommate faster
            </p>
            <div className="mt-4 h-1 w-20 bg-green-500 rounded-full"></div>
          </div>

          {/* ================= BASIC INFO ================= */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <IndianRupee size={14} className="text-green-700" />
                  <p>
                    Monthly Rent (₹)
                    <span className="text-red-600">*</span>
                  </p>
                </label>
                <input
                  name="rent"
                  type="number"
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <Building2 size={16} className="icon" />
                  <p>
                    City
                    <span className="text-red-600">*</span>
                  </p>
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="">
                <label className="label">
                  <MapPin size={16} className="icon" />
                  <p>
                    Area / Locality
                    <span className="text-red-600">*</span>
                  </p>
                </label>
                <input
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="">
                <label className="label">
                  <MapPin size={16} className="icon" />
                  Add Location
                </label>
                <div className="w-full pb-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLocationMode("auto");
                      getLocation();
                    }}
                    className={`btn-toggle ${locationMode === "auto" && "active"} w-full`}
                  >
                    Auto Detect
                  </button>
                </div>

                {locationMode === "auto" && locationSet && (
                  <p className="text-green-600 text-sm">✅ Location detected</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Description</h2>

            <div>
              <label className="label flex items-center gap-2">
                <Text size={16} className="icon" />
                <p>
                  Description
                  <span className="text-red-600">*</span>
                </p>
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="input min-h-30 resize-none"
                placeholder="Write details about the room, amenities, rules, etc..."
                required
              />
            </div>
          </div>

          {/* ================= PREFERENCES ================= */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Roommate Preferences
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <Moon size={16} className="icon" />
                  Sleep Schedule
                </label>
                <select
                  name="sleepSchedule"
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="early">Early Sleeper</option>
                  <option value="late">Night Owl</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <Sparkles size={16} className="icon" />
                  Cleanliness Level
                </label>
                <select
                  name="cleanliness"
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">
                  <Utensils size={16} className="icon" />
                  Food Preference
                </label>

                <select
                  name="foodPreference"
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <Users size={16} className="icon" />
                  Preferred Gender
                </label>

                <select
                  name="preferredGender"
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="">
                <label className="label">
                  <Briefcase size={16} className="icon" />
                  Occupation
                </label>
                <select
                  name="occupation"
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="working professional">
                    Workng Professional
                  </option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="">
                <label className="label">
                  <Briefcase size={16} className="icon" />
                  Work Style
                </label>
                <select
                  name="workStyle"
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="WFO">Work From Office</option>
                  <option value="WFH">Work From Home</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* ================= LIFESTYLE ================= */}
          <div className="space-y-3">
            <h2 className="section-title">
              <Home size={18} className="section-icon" />
              Lifestyle Preferences
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                { name: "smoking", label: "Smoking Allowed", icon: Cigarette },
                { name: "drinking", label: "Drinking Allowed", icon: Wine },
                { name: "pets", label: "Pets Allowed", icon: PawPrint },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <label
                    key={item.name}
                    className="toggle-pill flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      name={item.name}
                      onChange={handleChange}
                      className="accent-green-600"
                    />
                    <Icon size={14} className="text-green-700" />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
+
          {/* ================= AMENITIES ================= */}
          <div className="space-y-4">
            <h2 className="section-title">Amenities</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Room Type */}
              <div>
                <label className="label">Room Type</label>
                <select
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="Single room">Single Room</option>
                  <option value="PG">PG</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Furnished Level */}
              <div>
                <label className="label">Furnishing</label>
                <select
                  name="furnishedLevel"
                  value={form.furnishedLevel}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="semi furnished">Semi Furnished</option>
                  <option value="full furnished">Fully Furnished</option>
                  <option value="non furnished">Non Furnished</option>
                </select>
              </div>
            </div>

            {/* Boolean Amenities */}
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { name: "AC", label: "AC" },
                { name: "refrigerator", label: "Refrigerator" },
                { name: "parking", label: "Parking" },
                { name: "isPersonalRoomAvailable", label: "Personal Room" },
              ].map((item) => (
                <label
                  key={item.name}
                  className="toggle-pill flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={form[item.name as keyof typeof form] as boolean}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ================= IMAGES ================= */}
          <div className="space-y-3">
            <h2 className="section-title">
              <ImageIcon size={18} className="section-icon" />
              Room Images
            </h2>

            <input
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={handleImageChange}
              className="input"
            />

            <div className="flex flex-wrap gap-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={url}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
            List Room
          </button>
        </form>

        <style jsx>{`
          .input {
            width: 100%;
            padding: 12px;
            border-radius: 12px;
            border: 1px solid #d1d5db;
          }
          .label {
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 6px;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .icon {
            color: #16a34a;
          }

          .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .section-icon {
            color: #16a34a;
          }
          .btn-toggle {
            padding: 10px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
          }

          .btn-toggle:hover {
            background: #f0fdf4;
          }
          .btn-toggle.active {
            background: #22c55e;
            color: white;
          }
          .toggle-pill {
            background: #f0fdf4;
            padding: 8px 14px;
            border-radius: 999px;
            cursor: pointer;
          }
          .input:focus {
            border-color: #22c55e;
            box-shadow: 0 0 0 3px #dcfce7;
          }
        `}</style>
      </div>

      {loading && <RoomiooLoader isAddBg={true} textContent={"Uploading..."} />}
    </>
  );
}
