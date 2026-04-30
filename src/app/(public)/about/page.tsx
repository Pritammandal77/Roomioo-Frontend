"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Code2,
  Rocket,
  Heart,
  Coffee,
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
} from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-green-100 selection:text-green-900">
      {/* 1. HERO SECTION: Cinematic Impact */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-[0.03] [mask-image:radial-gradient(50%_50%_at_50%_50%,#000_0%,transparent_100%)]">
            <div className="h-full w-full bg-[grid] bg-[length:50px_50px]" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 animate-fade-in">
            <Sparkles className="w-3 h-3 text-green-600" /> Defining the Future
            of Living
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[0.9]">
            Beyond Four Walls. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-green-700">
              Beyond Flatmates.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Roomioo is a high-performance matching ecosystem designed to
            transform how students and professionals find their perfect living
            harmony.
          </p>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION: Narrative Depth */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">
                The Problem We Solved.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Most platforms focus on the property. We focus on the
                **people**. Traditional roommate finding is a gamble—a roll of
                the dice with your peace of mind.
              </p>
              <div className="space-y-4">
                {[
                  "Eliminating awkward first meetings",
                  "Matching by lifestyle, not just budget",
                  "Ensuring real-time verified communication",
                  "Reducing flatmate turnover rates",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 font-semibold text-gray-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between aspect-square">
                <Zap className="w-12 h-12 text-green-600 fill-green-100" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Instant Match</h4>
                  <p className="text-sm text-gray-500">
                    Algorithmically driven compatibility scores based on 15+
                    lifestyle data points.
                  </p>
                </div>
              </div>
              <div className="p-8 bg-gray-900 text-white rounded-[2.5rem] shadow-xl flex flex-col justify-between aspect-square">
                <ShieldCheck className="w-12 h-12 text-green-400" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Secure Sync</h4>
                  <p className="text-sm text-gray-400">
                    End-to-end encrypted messaging to protect your privacy until
                    you're ready to meet.
                  </p>
                </div>
              </div>
              <div className="md:col-span-2 p-8 bg-gradient-to-br from-green-600 to-green-800 rounded-[2.5rem] text-white">
                <h4 className="text-2xl font-bold mb-4 italic">
                  "A home is only as good as the people you share it with."
                </h4>
                <p className="opacity-80">
                  Roomioo was built to ensure that every homecoming is a moment
                  of relief, not stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE LAB: Technical Architecture */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              The Technical Backbone
            </h2>
            <p className="text-gray-500">
              Engineering a seamless experience from Chandrapur to the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group p-8 hover:bg-gray-50 rounded-3xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
                <Code2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">MERN Stack Mastery</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Utilizing MongoDB, Express, React, and Node.js for a robust,
                scalable infrastructure capable of handling thousands of
                concurrent users.
              </p>
            </div>
            <div className="group p-8 hover:bg-gray-50 rounded-3xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Next.js Framework</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Server-side rendering and optimized routing ensure
                lightning-fast performance and a buttery-smooth SPA feel.
              </p>
            </div>
            <div className="group p-8 hover:bg-gray-50 rounded-3xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
                <Terminal className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Real-time via Socket.io
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Instant messaging and live notifications built on web-socket
                technology for immediate roommate engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE DEVELOPER: Founder & Visionary */}
      <section className="py-24 px-6 bg-gray-900 text-white rounded-[4rem] mx-4 mb-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="relative group w-full lg:w-1/3">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-green-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-gray-800 rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl">
              <Image
                src="/pritamImg.jpg"
                alt="Pritam Mandal - Founder of Roomioo"
                fill
                className="object-cover object-top" // object-top keeps your face centered if the crop is tight
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>

            {/* Decorative Icon */}
            <div className="absolute -bottom-6 -right-6 bg-green-600 p-6 rounded-3xl shadow-xl hidden md:block">
              <Coffee className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-8">
            <div className="space-y-2">
              <h4 className="text-green-500 font-bold uppercase tracking-widest text-sm">
                Founder & Lead Engineer
              </h4>
              <h2 className="text-5xl font-black tracking-tight">
                Pritam Mandal
              </h2>
            </div>

            <p className="text-xl text-gray-400 leading-relaxed">
              Based in **Chandrapur, Maharashtra**, I am a Full Stack Developer
              completing my final-semester BSc IT at **Gondwana University**. My
              philosophy is simple: Code should solve human problems, not just
              create digital artifacts.
            </p>

            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
              <div>
                <p className="text-3xl font-bold text-white">170+</p>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                  LeetCode Solved
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">MERN</p>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                  Core Specialization
                </p>
              </div>
            </div>

            <p className="text-gray-400">
              Roomioo represents over 4 months of intensive development, from
              the first line of Node.js logic to the final cinematic UI polish.
              It is a testament to the talent emerging from rural
              Maharashtra—proving that world-class tech can be built anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CALL TO ACTION */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            Join the <span className="italic font-light">Movement.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/signup"
              className="group px-10 py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center gap-3 text-lg shadow-xl shadow-green-200"
            >
              Start Matching{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 font-bold rounded-2xl hover:bg-gray-50 transition-all text-lg"
            >
              The Support Hub
            </Link>
          </div>
          <p className="text-gray-400 text-sm font-medium pt-12">
            Made with{" "}
            <Heart className="w-4 h-4 inline-block text-red-500 fill-red-500 mx-1" />
            in Chandrapur for the Global Community.
          </p>
        </div>
      </section>
    </div>
  );
}
