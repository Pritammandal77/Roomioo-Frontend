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
  Briefcase,
  Users,
  Moon,
  HomeIcon,
  Bed,
  Refrigerator,
} from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";
import PrefCard from "@/components/ui/PrefCard";
import AmenityCard from "@/components/ui/AmenityCard";
import { addInterest } from "@/services/interest.api";
import AddInterestModal from "@/components/ui/AddInterestModal";
import Link from "next/link";
import ListingDetailsSkeleton from "@/components/loaders/ListingDetailsSkeleton";

function Page() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState<any>(null);

  // for interest modal
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  if (!propertyData) {
    return <ListingDetailsSkeleton />;
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

  const postedDate = new Date(propertyData.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  const handleSubmitInterest = async () => {
    try {
      setSubmitting(true);

      const res = await addInterest({
        propertyLister: postedBy?._id,
        propertyId: id,
        message,
      });

      console.log(res);

      toast.success("Interest sent successfully 🚀");
      setShowModal(false);
      setMessage("");
    } catch (error) {
      toast.error("Failed to send interest");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Image slider component */}
          <ImageSlider images={pictures} />

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm flex flex-col md:flex-row">
                <div className="flex flex-col w-full md:w-[70%] p-5">
                  <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <IndianRupee className="text-green-600" /> {rent}
                    <span className="text-lg text-gray-500 font-normal">
                      / month
                    </span>
                  </h1>

                  <p className="text-gray-600 flex items-center gap-1 mt-2">
                    <MapPin size={16} />
                    {location.area}, {location.city}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    Posted on {postedDate}
                  </p>
                </div>

                <div className="bg-white px-5 py-3 rounded-2xl shadow-sm md:w-[30%]">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-green-500 to-green-600 text-white font-semibold shadow-md hover:scale-[1.02] transition"
                  >
                    I'm Interested
                  </button>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Owner will be notified instantly
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* AMENITIES */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Home size={18} /> Amenities
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <AmenityCard
                    label={amenities.roomType}
                    icon={<HomeIcon size={16} />}
                  />

                  <AmenityCard
                    label={amenities.furnishedLevel}
                    icon={<Bed size={16} />}
                  />

                  <AmenityCard
                    label="AC"
                    active={amenities.AC}
                    icon={<Snowflake size={16} />}
                  />

                  <AmenityCard
                    label="Refrigerator"
                    active={amenities.refrigerator}
                    icon={<Refrigerator size={16} />}
                  />

                  <AmenityCard
                    label="Parking"
                    active={amenities.parking}
                    icon={<ParkingCircle size={16} />}
                  />

                  <AmenityCard
                    label="Private Room"
                    active={amenities.isPersonalRoomAvailable}
                    icon={<BedDouble size={16} />}
                  />
                </div>
              </div>

              {/* PREFERENCES */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="font-semibold text-lg mb-4">
                  Roommate Preferences
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Food */}
                  <PrefCard
                    icon={<Utensils size={18} />}
                    title="Food Preference"
                    value={preferences.foodPreference}
                  />

                  {/* Gender */}
                  <PrefCard
                    icon={<Users size={18} />}
                    title="Preferred Gender"
                    value={preferences.preferredGender}
                  />

                  {/* Work */}
                  <PrefCard
                    icon={<Briefcase size={18} />}
                    title="Work Style"
                    value={preferences.workStyle}
                  />

                  {/* Sleep */}
                  <PrefCard
                    icon={<Moon size={18} />}
                    title="Sleep Schedule"
                    value={preferences.sleepSchedule}
                  />

                  {/* Cleanliness */}
                  <div className="bg-green-50 p-4 rounded-xl col-span-full">
                    <p className="text-sm text-gray-600 mb-1">Cleanliness</p>

                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{preferences.cleanliness}/5</span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${(preferences.cleanliness / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col  w-full py-5">
                  <h2 className="font-semibold text-lg mb-4">
                    Habits allowed?
                  </h2>

                  <div className="flex flex-col md:flex-row gap-4">
                    <TogglePref label="Smoking" value={preferences.smoking} />

                    <TogglePref label="Drinking" value={preferences.drinking} />

                    <TogglePref label="Pets" value={preferences.pets} />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {/* OWNER */}
              <div className="bg-white p-5 rounded-2xl shadow-sm relative">
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

                <Link href={`/profile/${postedBy._id}`}>
                  <button className="bg-green-200 text-green-800 cursor-pointer rounded-xl px-3 py-1 text-md absolute bottom-2 right-2">
                    Visit profile
                  </button>
                </Link>
              </div>

              {/* CTA */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 rounded-xl bg-linear-to-r from-green-500 to-green-600 text-white font-semibold shadow-md hover:scale-[1.02] transition"
                >
                  I'm Interested
                </button>

                <p className="text-xs text-gray-400 mt-2 text-center">
                  Owner will be notified instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddInterestModal
          show={showModal}
          onClose={() => setShowModal(false)}
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmitInterest}
          submitting={submitting}
        />
      )}
    </>
  );
}

export default Page;

function TogglePref({ label, value }: any) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium ${
        value ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"
      }`}
    >
      <span>{label} : </span>
      <span className="pl-3">{value ? "Allowed" : "Not Allowed"}</span>
    </div>
  );
}
