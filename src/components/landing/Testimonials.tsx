"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  role: "Seeker" | "Lister";
  rating: number;
  review: string;
  img: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aman Verma",
    role: "Seeker",
    rating: 5,
    review: "Found my perfect flatmate within 2 days. Super smooth experience!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Riya Sharma",
    role: "Lister",
    rating: 4,
    review:
      "Listing rooms is so easy. Got multiple genuine requests instantly.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Karan Mehta",
    role: "Seeker",
    rating: 5,
    review: "Filters are insane. Found exactly what I needed in my budget.",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    role: "Lister",
    rating: 5,
    review: "Best platform for genuine users. No spam at all.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Rahul Singh",
    role: "Seeker",
    rating: 4,
    review: "UI is super clean and easy to use. Loved the experience.",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    id: 6,
    name: "Priya Nair",
    role: "Lister",
    rating: 5,
    review: "Got a perfect tenant within 24 hours. Highly recommended!",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 7,
    name: "Arjun Patel",
    role: "Seeker",
    rating: 5,
    review: "Way better than other apps. Everything feels premium.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 8,
    name: "Sneha Iyer",
    role: "Lister",
    rating: 4,
    review: "Loved the verification system. Feels safe and reliable.",
    img: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: 9,
    name: "Vikram Desai",
    role: "Seeker",
    rating: 5,
    review: "Found a flat near my office easily. Saved a lot of time!",
    img: "https://randomuser.me/api/portraits/men/90.jpg",
  },
  {
    id: 10,
    name: "Ananya Gupta",
    role: "Lister",
    rating: 5,
    review: "Roomio made listing and managing tenants super simple.",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-yellow-400 text-sm">
      {"★".repeat(rating)}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="min-w-80 max-w-80 bg-white border border-green-100 p-5 rounded-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={t.img}
          alt={t.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-gray-800 text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-green-600 font-medium">{t.role}</p>
        </div>
      </div>

      <StarRating rating={t.rating} />

      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{t.review}</p>
    </div>
  );
}

function MarqueeRow({ direction = "left" }: { direction?: "left" | "right" }) {
  const [isPaused, setIsPaused] = useState(false);

  // triple copy for seamless loop
  const loopData = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-6 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {loopData.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full py-20 bg-green-100 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
          What People Say About Roomio
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Real experiences from seekers & listers
        </p>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-6">
        <MarqueeRow direction="right" />
        <MarqueeRow direction="left" />
      </div>
    </section>
  );
}
