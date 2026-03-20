"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  MessageCircle,
  Home,
  Zap,
  SlidersHorizontal,
  IndianRupee,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            Why Choose <span className="text-green-600">Roomio</span>?
          </motion.h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to find the perfect housemate — faster, safer,
            and smarter.
          </p>
        </div>

        {/* TOP SECTION */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT BIG CARD (MAIN USP) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-10 rounded-3xl bg-linear-to-br from-green-500 to-green-400 text-white shadow-xl"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/20 mb-6">
              <Users size={28} />
            </div>

            <h3 className="text-2xl font-bold">Smart Lifestyle Matching</h3>

            <p className="mt-4 text-white/90">
              Don’t live with random people. Match with housemates based on
              habits, routine, cleanliness, and vibe — so you actually enjoy
              living together.
            </p>
          </motion.div>

          {/* RIGHT FEATURES LIST */}
          <div className="space-y-6">
            <Feature icon={IndianRupee} title="Zero Brokerage" />
            <Feature icon={ShieldCheck} title="Verified Profiles" />
            <Feature icon={MessageCircle} title="Direct Chat & Call" />
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <MiniCard icon={SlidersHorizontal} title="Smart Filters" />
          <MiniCard icon={Zap} title="Quick Process" />
          <MiniCard icon={Users} title="Community Driven" />
        </div>
      </div>
    </section>
  );
}

/* RIGHT SIDE LIST ITEM */
function Feature({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
        <Icon size={20} />
      </div>
      <p className="text-gray-700 font-medium">{title}</p>
    </motion.div>
  );
}

/* SMALL CARDS */
function MiniCard({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600 mb-3">
        <Icon size={20} />
      </div>
      <p className="text-gray-700 font-medium">{title}</p>
    </motion.div>
  );
}
