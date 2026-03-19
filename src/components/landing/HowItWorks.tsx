"use client";

import { motion } from "framer-motion";
import { Home, Search, MessageCircle } from "lucide-react";

const steps = [
  {
    title: "List Your Space",
    description:
      "Add your flat, room, or PG with rent, facilities, and your preferred housemate lifestyle.",
    icon: Home,
  },
  {
    title: "Discover & Apply",
    description:
      "Browse listings, filter by preferences, and apply to places that match your vibe.",
    icon: Search,
  },
  {
    title: "Connect & Move In",
    description:
      "Chat or call, review profiles, and finalize your stay with the right people.",
    icon: MessageCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-24 bg-linear-to-b from-white to-green-50 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-200/30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-gray-900"
        >
          How It <span className="text-green-600">Works</span>
        </motion.h2>

        <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
          Find your perfect housemate or list your space in a few simple steps.
        </p>

        {/* Steps */}
        <div className="mt-20 grid md:grid-cols-3 gap-10 relative">
          
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-green-200 to-transparent"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Glass Card */}
                <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
                  
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-linear-to-br from-green-500 to-green-400 text-white shadow-md">
                    <Icon size={28} />
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold shadow-md">
                    {index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl font-semibold text-gray-800">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 px-8 py-4 rounded-2xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transition"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}