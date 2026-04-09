"use client";
import { motion } from "framer-motion";
import { FlipWords } from "../ui/FlipWords";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/lib/rtk/hooks";
import Link from "next/link";

function Hero() {
  const user = useAppSelector((state) => state.user.userData);

  let words = ["Room", "Flat"];

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
            Find Your Perfect <br />
            <FlipWords words={words} />
            Mate Based <br className="hidden xl:inline" /> on{" "}
            <span className="text-green-600">Lifestyle</span>
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
          >
            {user ? (
              <div className="flex gap-4 flex-wrap">
                <Link href="/listings/all">
                  <button className="px-6 py-3 cursor-pointer rounded-2xl bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition">
                    Find Roommate
                  </button>
                </Link>
                <Link href="/rooms/new">
                  <button className="px-6 py-3 cursor-pointer rounded-2xl border border-green-600 text-green-600 font-medium hover:bg-green-50 transition">
                    Post a Room
                  </button>
                </Link>
              </div>
            ) : (
              <Link
                href="/signup"
                className="px-6 py-4 cursor-pointer rounded-xl bg-green-600 text-white hover:bg-green-700"
              >
                Get Started
              </Link>
            )}
          </motion.div>

          {/* Small trust text */}
          <p className="text-sm text-gray-400">
            Trusted by students & professionals across India 🇮🇳
          </p>
        </div>

        {/* RIGHT VISUAL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-125 flex items-center justify-center"
        >
          {/* MAIN USER CARD */}
          <div className="z-10 bg-white rounded-3xl shadow-2xl p-6 w-65 text-center border">
            <img
              src="https://i.pravatar.cc/150?img=12"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="font-semibold text-gray-800">You</h3>
            <p className="text-xs text-gray-500">Looking for roommate</p>
          </div>

          {/* MATCH CARD 1 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-0 left-10 bg-white p-4 rounded-2xl shadow-lg w-50"
          >
            <p className="text-sm font-medium">Rahul</p>
            <p className="text-xs text-gray-500">Gym • Night Owl</p>
            <span className="text-green-600 text-sm font-bold">92% Match</span>
          </motion.div>

          {/* MATCH CARD 2 */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute bottom-0 left-16 bg-white p-4 rounded-2xl shadow-lg w-50"
          >
            <p className="text-sm font-medium">Sneha</p>
            <p className="text-xs text-gray-500">Student • Quiet</p>
            <span className="text-green-600 text-sm font-bold">88% Match</span>
          </motion.div>

          {/* MATCH CARD 3 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-lg w-50"
          >
            <p className="text-sm font-medium">Aman</p>
            <p className="text-xs text-gray-500">Clean • Veg</p>
            <span className="text-green-600 text-sm font-bold">85% Match</span>
          </motion.div>

          {/* ROOM CARD */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute bottom-10 right-5 bg-green-600 text-white p-4 rounded-2xl shadow-xl w-55"
          >
            <p className="text-sm font-semibold">1BHK in Pune</p>
            <p className="text-xs opacity-80">₹8000 • Near IT Park</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
