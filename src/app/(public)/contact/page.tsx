"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  Send,
  CheckCircle,
  ArrowLeft,
  Mail,
  MessageSquare,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID as string,
  );

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-sm border border-green-100">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
          <p className="text-gray-600 mt-2">
            Thanks for reaching out. The Roomioo team will get back to you soon.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-green-600 font-medium hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-10 xl:pt-25 text-gray-800 pb-20 selection:bg-green-100 selection:text-green-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-green-50/50 to-transparent -z-10" />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100/80 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-200">
                <Sparkles className="w-3 h-3" />
                <span>Always here to help</span>
              </div>

              {/* Hero Text */}
              <h1 className="text-5xl font-black text-gray-900 leading-[1.1] mb-6">
                Let’s get you <br />
                <span className="text-green-600">settled in.</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                Finding the perfect roommate shouldn't be stressful. Whether you
                have a question about a listing or just want to say hi, our team
                is ready to assist.
              </p>
            </div>

            {/* Interactive Quick Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="group flex items-center gap-5 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md hover:shadow-green-50/50 transition-all duration-300">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Direct Support</h4>
                  <p className="text-gray-500 text-sm">
                    Real answers within 24h.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-4 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-300 relative overflow-hidden">
              {/* Subtle design element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[5rem] z-0 opacity-50" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-bold text-gray-700 ml-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-bold text-gray-700 ml-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="johndoe@gmail.com"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-gray-400"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-bold text-gray-700 ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full group bg-green-600 text-white font-bold py-5 rounded-[1.25rem] hover:bg-green-700 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                >
                  {state.submitting ? "Sending..." : "Send to Roomioo Team"}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
