"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID as string);
  
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
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 mb-10">
            Have a question about Roomioo? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="How can we help you find the perfect roommate?"
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
              className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {state.submitting ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
