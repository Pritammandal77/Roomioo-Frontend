"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import { listNewRoom } from "@/services/rooms.api";

export default function Page() {
  const [locationMode, setLocationMode] = useState<"auto" | "manual" | null>(
    null,
  );
  const [fullAddress, setFullAddress] = useState("");

  const [form, setForm] = useState<RoomForm>({
    rent: "",
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
    workStyle: "WFO",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [locationSet, setLocationSet] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
          );

          const data = await res.json();
          const address = data.address;

          // ✅ CITY (better fallback chain)
          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            address.state_district ||
            "";

          // ✅ AREA (DETAILED LOCATION)
          const area =
            address.neighbourhood ||
            address.suburb ||
            address.hamlet ||
            address.residential ||
            address.road ||
            address.quarter ||
            address.city_district ||
            address.state_district ||
            "";

          // ✅ OPTIONAL: FULL DISPLAY NAME (SUPER IMPORTANT 🔥)
          const fullAddress = data.display_name;

          setForm((prev) => ({
            ...prev,
            coordinates: [lng, lat],
            city,
            area,
          }));

          setFullAddress(data.display_name);
          console.log("📍 Full Address:", fullAddress); // debug
          setLocationSet(true);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch address");
        }
      },
      () => {
        alert("Location access denied ❌");
      },
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!locationMode) {
      alert("Please select location method");
      return;
    }

    if (locationMode === "auto" && form.coordinates.length !== 2) {
      alert("Please fetch your location");
      return;
    }

    if (locationMode === "manual" && (!form.city || !form.area)) {
      alert("Please enter city and area");
      return;
    }

    try {
      setLoading(true);
      const res = await listNewRoom(form);
      console.log("uploaded room", res);
      alert("Room listed successfully 🚀");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-green-100 shadow-2xl rounded-3xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-green-700">
            List Your Room 🏡
          </h1>
          <p className="text-sm text-gray-500">
            Find the perfect roommate faster with smart preferences
          </p>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="rent"
            placeholder="Rent (₹)"
            type="number"
            onChange={handleChange}
            className="input"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="input"
            disabled={locationMode === "auto"}
          />

          <input
            name="area"
            placeholder="Area / Locality"
            value={form.area}
            onChange={handleChange}
            className="input md:col-span-2"
            disabled={locationMode === "auto"}
          />
        </div>

        {/* Location Mode */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-600">
            Choose Room Location Method
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* AUTO */}
            <button
              type="button"
              onClick={() => {
                setLocationMode("auto");
                getLocation();

                // reset manual fields
                setForm((prev) => ({
                  ...prev,
                  city: "",
                  area: "",
                }));
              }}
              className={`p-3 rounded-xl border font-medium transition ${
                locationMode === "auto"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white hover:bg-green-50"
              }`}
            >
              📍 Use Current Location
            </button>

            {/* MANUAL */}
            <button
              type="button"
              onClick={() => {
                setLocationMode("manual");
                setLocationSet(false);

                // reset coords
                setForm((prev) => ({
                  ...prev,
                  coordinates: [],
                }));
              }}
              className={`p-3 rounded-xl border font-medium transition ${
                locationMode === "manual"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white hover:bg-green-50"
              }`}
            >
              ✏️ Add Manually
            </button>

            {locationMode === "auto" && fullAddress && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
                📍 {fullAddress}
              </div>
            )}
          </div>

          {/* AUTO STATUS */}
          {locationMode === "auto" && locationSet && (
            <p className="text-green-600 text-sm font-medium">
              ✅ Location detected successfully
            </p>
          )}

          {/* MANUAL INPUTS */}
          {locationMode === "manual" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="input"
              />

              <input
                name="area"
                placeholder="Area / Locality"
                value={form.area}
                onChange={handleChange}
                className="input md:col-span-2"
              />
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="sleepSchedule"
            onChange={handleChange}
            className="input"
          >
            <option value="early">Early Sleeper</option>
            <option value="late">Night Owl</option>
          </select>

          <input
            type="number"
            name="cleanliness"
            min={1}
            max={5}
            onChange={handleChange}
            className="input"
          />

          <select
            name="foodPreference"
            onChange={handleChange}
            className="input"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <select
            name="preferredGender"
            onChange={handleChange}
            className="input"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <select
            name="workStyle"
            onChange={handleChange}
            className="input md:col-span-2"
          >
            <option value="WFO">WFO</option>
            <option value="WFH">WFH</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-4">
          {[
            { name: "smoking", label: "Smoking" },
            { name: "drinking", label: "Drinking" },
            { name: "pets", label: "Pets" },
          ].map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full cursor-pointer hover:bg-green-100 transition"
            >
              <input
                type="checkbox"
                name={item.name}
                onChange={handleChange}
                className="accent-green-600"
              />
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
        >
          {loading ? "Listing..." : "🚀 List Room"}
        </button>
      </form>

      <style jsx>{`
        .input {
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          outline: none;
          background: white;
          transition: all 0.2s ease;
        }
        .input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px #dcfce7;
        }
      `}</style>
    </div>
  );
}
