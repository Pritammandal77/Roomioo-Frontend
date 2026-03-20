"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="w-full py-28 px-6 bg-linear-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            Finding the Right Housemate is{" "}
            <span className="text-red-500">Hard</span>...
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            But it doesn’t have to be.
          </p>
        </div>

        {/* BEFORE vs AFTER */}
        <div className="mt-20 grid md:grid-cols-2 gap-10">
          {/* BEFORE (Problems) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group p-8 rounded-3xl bg-white border border-red-100 shadow-sm hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-red-500 mb-6">
              ❌ Without Roomio
            </h3>

            <ul className="space-y-4">
              {[
                "Random roommates with different lifestyles",
                "High brokerage fees and middlemen",
                "No trust or verification",
                "Endless searching with no results",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <XCircle className="text-red-400 mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AFTER (Solutions) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group p-8 rounded-3xl bg-linear-to-br from-green-500 to-green-400 text-white shadow-xl hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-semibold mb-6">✅ With Roomio</h3>

            <ul className="space-y-4">
              {[
                "Lifestyle-based matching with compatible people",
                "Zero brokerage — direct connections",
                "Verified profiles for safe interactions",
                "Quick and easy discovery process",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-white mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Highlight Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <p className="text-xl font-medium text-gray-800">
            Stop compromising.{" "}
            <span className="text-green-600 font-semibold">
              Start living better.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
