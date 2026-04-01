"use client";

import { fetchPropertyData } from "@/services/rooms.api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  MapPin,
  IndianRupee,
  User,
  Home,
  Snowflake,
  ParkingCircle,
  BedDouble,
  Utensils,
} from "lucide-react";

function Page() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetchPropertyData(id);
        setPropertyData(res.data.data);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [id]);

  // AUTO SLIDER
  useEffect(() => {
    if (!propertyData?.pictures) return;

    const interval = setInterval(() => {
      setActiveImage((prev) =>
        prev === propertyData.pictures.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [propertyData]);

  if (!propertyData) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const {
    pictures,
    location,
    rent,
    description,
    amenities,
    preferences,
    postedBy,
  } = propertyData;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* IMAGE SECTION */}
        <div className="bg-white rounded-3xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
          {/* LEFT THUMBNAILS */}
          <div className="flex md:flex-col gap-2 md:w-24 overflow-x-auto">
            {pictures.map((img: any, index: number) => (
              <img
                key={index}
                src={img.url}
                onClick={() => setActiveImage(index)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${
                  activeImage === index
                    ? "border-green-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="flex-1 h-80 md:h-100 rounded-2xl overflow-hidden">
            <img
              src={pictures[activeImage]?.url}
              className="w-full h-full object-cover transition duration-500"
            />
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* LEFT MAIN */}
          <div className="md:col-span-2 space-y-6">
            {/* TITLE */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <IndianRupee /> {rent} / month
              </h1>

              <p className="text-gray-500 flex items-center gap-1 mt-2">
                <MapPin size={16} />
                {location.area}, {location.city}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>

            {/* AMENITIES */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Home size={18} /> Amenities
              </h2>

              <div className="flex flex-wrap gap-3 text-sm">
                <Badge label={amenities.roomType} />
                <Badge label={amenities.furnishedLevel} />
                {amenities.AC && (
                  <Badge label="AC" icon={<Snowflake size={14} />} />
                )}
                {amenities.parking && (
                  <Badge label="Parking" icon={<ParkingCircle size={14} />} />
                )}
                {amenities.isPersonalRoomAvailable && (
                  <Badge label="Private Room" icon={<BedDouble size={14} />} />
                )}
              </div>
            </div>

            {/* PREFERENCES */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h2 className="font-semibold mb-3">Roommate Preferences</h2>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Badge
                  label={`Food: ${preferences.foodPreference}`}
                  icon={<Utensils size={14} />}
                />
                <Badge label={`Gender: ${preferences.preferredGender}`} />
                <Badge label={`Work: ${preferences.workStyle}`} />
                <Badge label={`Cleanliness: ${preferences.cleanliness}/5`} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* OWNER */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <User size={18} /> Posted By
              </h2>

              <div className="flex items-center gap-3">
                <img
                  src={postedBy.profilePicture}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{postedBy.fullName}</p>
                  <p className="text-xs text-gray-500">{postedBy.email}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <button className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                I'm Interested 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

// BADGE COMPONENT
function Badge({ label, icon }: any) {
  return (
    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
      {icon}
      {label}
    </div>
  );
}
