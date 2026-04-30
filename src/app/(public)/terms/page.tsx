"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, AlertCircle, UserX, ShieldAlert, HeartHandshake } from "lucide-react";

export default function TermsAndConditions() {
  const lastUpdated = "April 30, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <Scale className="w-5 h-5 text-green-600" />,
      content: "By accessing or using Roomioo, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are prohibited from using the platform[cite: 2].",
    },
    {
      title: "2. Platform Limitation & Disclaimer",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      content: (
        <div className="space-y-2">
          <p>
            Roomioo is a matching platform only. We provide the technology to connect individuals seeking roommates based on lifestyle[cite: 2].
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-2">
            <p className="text-red-700 font-medium">
              We do not verify property ownership or conduct criminal background checks. Users interact and meet at their own risk[cite: 2].
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "3. User Responsibility",
      icon: <UserX className="w-5 h-5 text-green-600" />,
      content: "You agree to provide truthful and accurate information. Creating fake profiles, posting scam listings, or harassing other users will result in an immediate permanent ban without notice[cite: 2].",
    },
    {
      title: "4. Liability",
      icon: <ShieldAlert className="w-5 h-5 text-green-600" />,
      content: "Roomioo is not liable for any disputes, financial losses, property damage, or physical harm resulting from roommate connections or agreements made via the platform[cite: 2].",
    },
    {
      title: "5. Community Vibe",
      icon: <HeartHandshake className="w-5 h-5 text-green-600" />,
      content: "Shared living is built on respect. We encourage all users to communicate clearly and set boundaries before moving in together.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <Link href="/" className="flex items-center text-green-600 font-medium mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <header className="border-b border-gray-100 pb-8 mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms & Conditions</h1>
            <p className="text-gray-500 italic">Last Updated: {lastUpdated}[cite: 2]</p>
          </header>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">{section.icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <div className="text-gray-600 leading-relaxed pl-1">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <footer className="mt-16 pt-10 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact & Support</h3>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-gray-700">For legal inquiries or support issues, please contact[cite: 2]:</p>
              <div className="mt-4 space-y-1 font-medium text-gray-900">
                <p>Email: support@roomioo.com[cite: 2]</p>
                <p>Location: Pune, India[cite: 2]</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}