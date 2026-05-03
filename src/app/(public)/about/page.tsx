"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Code2,
  Heart,
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
} from "lucide-react";
import Image from "next/image";

// Explicitly typed variants to resolve TS errors
const springFadeUp: Variants = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
  },
};

const staggerContainer: Variants = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const hoverScale: Variants = {
  hover: { scale: 1.02, y: -5 },
  tap: { scale: 0.98 },
};

const orbVariants: Variants = {
  animate: (custom: { x: number[]; y: number[]; duration: number }) => ({
    x: custom.x,
    y: custom.y,
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
    },
  }),
};

export default function AboutUs() {
  useEffect(() => {
    const container = document.getElementById("hero-particles");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 28; i++) {
      const dot = document.createElement("div");
      const size = 2 + Math.random() * 3;
      Object.assign(dot.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: i % 3 === 0 ? "#4ade80" : "#16a34a",
        borderRadius: "50%",
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 20}%`,
        opacity: "0",
        animation: `riseDot ${7 + Math.random() * 9}s ${Math.random() * 14}s linear infinite`,
      });
      container.appendChild(dot);
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes riseDot {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          8%   { opacity: 0.6; }
          92%  { opacity: 0.2; }
          100% { transform: translateY(-320px) scale(0.3); opacity: 0; }
        }
      `}</style>

      <div className="min-h-screen bg-white text-gray-900 selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
        {/* ── 1. HERO ── */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#166534 1px, transparent 1px), linear-gradient(90deg, #166534 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
              animate={{ opacity: [0.03, 0.07, 0.03] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute rounded-full bg-green-400"
              style={{ width: 420, height: 420, top: -100, left: -80, filter: "blur(90px)", opacity: 0.18 }}
              custom={{ x: [0, 40, 10, 0], y: [0, -30, 20, 0], duration: 18 }}
              variants={orbVariants}
              animate="animate"
            />

            <motion.div
              className="absolute rounded-full bg-emerald-300"
              style={{ width: 300, height: 300, top: "30%", right: -80, filter: "blur(70px)", opacity: 0.15 }}
              custom={{ x: [0, -30, -10, 0], y: [0, 30, -15, 0], duration: 22 }}
              variants={orbVariants}
              animate="animate"
            />

            <motion.div
              className="absolute rounded-full bg-green-500"
              style={{ width: 240, height: 240, bottom: -60, left: "38%", filter: "blur(60px)", opacity: 0.13 }}
              custom={{ x: [0, 20, -20, 0], y: [0, -20, 10, 0], duration: 15 }}
              variants={orbVariants}
              animate="animate"
            />

            <div id="hero-particles" className="absolute inset-0" />
          </div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div
              variants={springFadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8"
            >
              <Sparkles className="w-3 h-3 text-green-600" /> Defining the Future of Living
            </motion.div>

            <motion.h1
              variants={springFadeUp}
              className="text-5xl md:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[1] md:leading-[0.9]"
            >
              Beyond Four Walls. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-green-700">
                Beyond Flatmates.
              </span>
            </motion.h1>

            <motion.p
              variants={springFadeUp}
              className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Roomioo is a high-performance matching ecosystem designed to
              transform how students and professionals find their perfect living
              harmony.
            </motion.p>
          </motion.div>
        </section>

        {/* ── 2. PROBLEM & SOLUTION ── */}
        <section className="py-20 md:py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  The Problem We Solved.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Most platforms focus on the property. We focus on the people.
                  Traditional roommate finding is a gamble—a roll of the dice with
                  your peace of mind.
                </p>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {[
                    "Eliminating awkward first meetings",
                    "Matching by lifestyle, not just budget",
                    "Ensuring real-time verified communication",
                    "Reducing flatmate turnover rates",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={springFadeUp}
                      className="flex items-center gap-3 font-semibold text-gray-700"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600" /> {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  variants={hoverScale}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-8 bg-purple-100 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between aspect-square cursor-pointer"
                >
                  <Zap className="w-12 h-12 text-purple-500 fill-purple-200" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Instant Match</h4>
                    <p className="text-sm text-gray-700">
                      Algorithmically driven compatibility scores based on 15+
                      lifestyle data points.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  variants={hoverScale}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-8 bg-gray-900 text-white rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between aspect-square cursor-pointer"
                >
                  <ShieldCheck className="w-12 h-12 text-gray-400" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Secure Sync</h4>
                    <p className="text-sm text-gray-400">
                      End-to-end encrypted messaging to protect your privacy
                      until you're ready.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="md:col-span-2 p-8 bg-gradient-to-br from-green-600 to-green-800 rounded-[2rem] md:rounded-[2.5rem] text-white"
                >
                  <h4 className="text-xl md:text-2xl font-bold mb-4 italic">
                    "A home is only as good as the people you share it with."
                  </h4>
                  <p className="opacity-80">
                    Roomioo was built to ensure that every homecoming is a moment
                    of relief, not stress.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. TECH ── */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16 space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                The Technical Backbone
              </h2>
              <p className="text-gray-500">
                Engineering a seamless experience from Chandrapur to the world.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Code2,
                  title: "MERN Stack Mastery",
                  color: "bg-green-50",
                  iconColor: "text-green-600",
                  desc: "Utilizing MongoDB, Express, React, and Node.js for a robust, scalable infrastructure.",
                },
                {
                  icon: Globe,
                  title: "Next.js Framework",
                  color: "bg-blue-50",
                  iconColor: "text-blue-600",
                  desc: "Server-side rendering and optimized routing ensure lightning-fast performance.",
                },
                {
                  icon: Terminal,
                  title: "Socket.io Real-time",
                  color: "bg-purple-50",
                  iconColor: "text-purple-600",
                  desc: "Instant messaging and live notifications built on web-socket technology.",
                },
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  variants={springFadeUp}
                  whileHover={{ y: -10 }}
                  className="group p-8 hover:bg-gray-50 rounded-3xl transition-colors duration-300 text-center border border-transparent hover:border-gray-100"
                >
                  <div className={`w-16 h-16 ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform`}>
                    <tech.icon className={`w-8 h-8 ${tech.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 4. DEVELOPER ── */}
        <section className="py-20 md:py-24 px-6 bg-gray-900 text-white rounded-[3rem] md:rounded-[4rem] mx-4 mb-12">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 60 }}
              className="relative group w-full max-w-sm lg:w-1/3"
            >
              <div className="absolute -inset-4 bg-green-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-[4/5] bg-gray-800 rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl">
                <Image
                  src="/pritamImg.jpg"
                  alt="Pritam Mandal"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-2/3 space-y-8"
            >
              <div className="space-y-2">
                <h4 className="text-green-500 font-bold uppercase tracking-widest text-sm">
                  Founder & Lead Engineer
                </h4>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                  Pritam Mandal
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Based in Chandrapur, Maharashtra, I am a Full Stack Developer
                completing my final-semester BSc IT.
              </p>
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <p className="text-2xl md:text-3xl font-bold text-white">170+</p>
                  <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">LeetCode Solved</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <p className="text-2xl md:text-3xl font-bold text-white">MERN</p>
                  <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Core Specialization</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 5. FOOTER CTA ── */}
        <section className="py-24 md:py-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 40 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter">
              Join the <span className="italic font-light">Movement.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                href="/signup"
                className="w-full sm:w-auto group px-10 py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-green-200"
              >
                Start Matching{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 font-bold rounded-2xl hover:bg-gray-50 transition-all text-lg"
              >
                The Support Hub
              </Link>
            </div>
            <p className="text-gray-400 text-xs md:text-sm font-medium pt-12">
              Made with{" "}
              <Heart className="w-4 h-4 inline-block text-red-500 fill-red-500 mx-1" />{" "}
              in Chandrapur.
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
}