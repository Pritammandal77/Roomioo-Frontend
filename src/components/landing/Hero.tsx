"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/rtk/hooks";

function Hero() {
  const user = useAppSelector((state) => state.user.userData);

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-green-50 px-6 pt-17 ">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Find Your Perfect <span className="text-green-600">Roommate</span>{" "}
            Based on <span className="text-green-600">Lifestyle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-gray-600 text-lg"
          >
            No more random roommates. Match with people who share your habits,
            vibe, and daily routine.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex gap-4 flex-wrap"
          >
            <button className="px-6 py-3 rounded-2xl bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition">
              Find Roommate
            </button>

            <button className="px-6 py-3 rounded-2xl border border-green-600 text-green-600 font-medium hover:bg-green-50 transition">
              Post a Room
            </button>
          </motion.div>

          {/* Small trust text */}
          <p className="text-sm text-gray-400">
            Trusted by students & professionals across India 🇮🇳
          </p>
        </div>

        {/* RIGHT VISUAL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
        >
          <div className="space-y-4">
            {/* Profile Card 1 */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-800">Rahul, 23</h3>
                <p className="text-sm text-gray-500">
                  Night Owl • Gym • Non-Smoker
                </p>
              </div>
              <span className="text-green-600 font-bold">92% Match</span>
            </div>

            {/* Profile Card 2 */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-800">Aman, 25</h3>
                <p className="text-sm text-gray-500">
                  Early Bird • Clean • Veg
                </p>
              </div>
              <span className="text-green-600 font-bold">85% Match</span>
            </div>

            {/* Profile Card 3 */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-800">Sneha, 22</h3>
                <p className="text-sm text-gray-500">
                  Quiet • Student • Non-Drinker
                </p>
              </div>
              <span className="text-green-600 font-bold">88% Match</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
