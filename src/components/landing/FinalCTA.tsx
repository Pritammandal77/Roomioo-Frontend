"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="w-full py-28 px-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-green-400 "></div>

      {/* Glow Effects */}
      <div className="absolute -top-25 -left-25 w-75 h-75 bg-white/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-25 -right-25 w-75 h-75 bg-white/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Find People You’ll Love Living With
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-6 text-lg"
        >
          Whether you're looking for a place or listing one — Roomio helps you
          connect with the right people, faster.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <button className="px-8 py-4 rounded-2xl bg-white text-green-700 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition">
            Find Your Housemate
          </button>

          {/* Secondary CTA */}
          <button className="px-8 py-4 rounded-2xl border border-green-200  font-semibold hover:bg-white/10 transition">
            List Your Space
          </button>
        </motion.div>

        {/* Small Trust Text */}
        <p className="mt-6 text-sm">
          No brokerage • Verified users • Quick matching
        </p>
      </div>
    </section>
  );
}
