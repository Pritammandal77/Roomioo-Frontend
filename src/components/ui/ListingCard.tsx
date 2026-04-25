"use client";

import { motion } from "framer-motion";
import { MapPin, IndianRupee } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function ListingCard({ listing, id, index }: any) {
  const { rent, location, pictures, amenities, matchPercentage, createdAt } =
    listing;

  dayjs.extend(relativeTime);
  console.log(createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group rounded-3xl overflow-hidden bg-white min-w-90 xl:min-w-70 max-w-90 border border-gray-100 shadow-sm hover:shadow-xl transition"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pictures?.[0]?.url}
          alt="room"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        {/* ROOM TYPE BADGE */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs px-3 py-1 rounded-full shadow">
          {amenities?.roomType}
        </div>

        {matchPercentage && (
          <div
            className={`absolute top-3 right-3 ${matchPercentage > 50 ? "bg-green-600" : "bg-orange-400"}  text-white text-sm px-3 py-1 rounded-full shadow`}
          >
            {matchPercentage}% Match
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-800">
          {amenities?.roomType} in {location?.area}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
          <MapPin size={16} />
          {location?.city}
        </div>

        <div className="flex items-end justify-between mt-4">
          {/* RENT */}
          <p className="text-green-600 font-semibold flex items-center gap-1">
            <IndianRupee size={16} />
            {rent} / month
          </p>

          <p className="text-xs text-gray-500">{dayjs(createdAt).fromNow()}</p>
        </div>

        {listing.distanceInKm && (
          <p className="text-xs text-green-600 font-medium">
            📍 {listing.distanceInKm} km away
          </p>
        )}

        {/* CTA */}
        <Link href={`/listings/${id}`}>
          <button className="mt-4 w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
