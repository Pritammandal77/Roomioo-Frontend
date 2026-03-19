"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "List Your Space",
    description:
      "Already living in a flat, room, or PG? Add your listing with rent, facilities, and your preferred housemate lifestyle.",
  },
  {
    title: "Discover & Apply",
    description:
      "Browse listings based on your preferences. Find the perfect place and apply to live with compatible housemates.",
  },
  {
    title: "Connect & Move In",
    description:
      "Chat or call the owner, check profiles, and finalize your stay with the right people.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-gray-900"
        >
          How It <span className="text-green-600">Works</span>
        </motion.h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Find your perfect housemate or list your space in just a few simple
          steps.
        </p>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              {/* Step Number */}
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-lg">
                {index + 1}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
