"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const listings = [
  {
    id: 1,
    title: "2BHK Flat in Baner",
    location: "Pune",
    rent: "₹8,500 / month",
    match: "92%",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
  },
  {
    id: 2,
    title: "Single Room in Andheri",
    location: "Mumbai",
    rent: "₹12,000 / month",
    match: "87%",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
  },
  {
    id: 3,
    title: "PG near HSR Layout",
    location: "Bangalore",
    rent: "₹6,500 / month",
    match: "90%",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  },
];

export default function FeaturedListings() {
  return (
    <section className="w-full py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Featured <span className="text-green-600">Listings</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Explore places that match your lifestyle and vibe.
            </p>
          </div>

          {/* View All Button */}
          <button className="mt-6 md:mt-0 px-6 py-3 rounded-xl border border-green-600 text-green-600 hover:bg-green-50 transition">
            View All
          </button>
        </div>

        {/* Listings Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition"
            >
              
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

                {/* Match Badge */}
                <div className="absolute top-3 right-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow">
                  {item.match} Match
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                  <MapPin size={16} />
                  {item.location}
                </div>

                {/* Rent */}
                <p className="mt-4 text-green-600 font-semibold">
                  {item.rent}
                </p>

                {/* CTA */}
                <button className="mt-4 w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}