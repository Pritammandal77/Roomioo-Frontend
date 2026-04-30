"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, AlertCircle, UserX, ShieldAlert, HeartHandshake } from "lucide-react";

export default function TermsAndConditions() {
  const lastUpdated = "April 30, 2026"; //

  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <Scale className="w-5 h-5 text-green-600" />,
      content: "By accessing or using Roomioo, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are prohibited from using the platform.",
    },
    {
      title: "2. Platform Limitation & Disclaimer",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      content: (
        <div className="space-y-2">
          <p>
            Roomioo is a matching platform only. We provide the technology to connect individuals seeking roommates based on lifestyle.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-2">
            <p className="text-red-700 font-medium">
              We do not verify property ownership or conduct criminal background checks. Users interact and meet at their own risk.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "3. User Responsibility",
      icon: <UserX className="w-5 h-5 text-green-600" />,
      content: "You agree to provide truthful and accurate information. Creating fake profiles, posting scam listings, or harassing other users will result in an immediate permanent ban without notice.",
    },
    {
      title: "4. Liability",
      icon: <ShieldAlert className="w-5 h-5 text-green-600" />,
      content: "Roomioo is not liable for any disputes, financial losses, property damage, or physical harm resulting from roommate connections or agreements made via the platform.",
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
            <p className="text-gray-500 italic">Last Updated: {lastUpdated}</p>
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
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 relative overflow-hidden group">
              {/* Decorative Background Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative z-10">
                <p className="text-gray-700 leading-relaxed">
                  For legal inquiries, dispute reports, or support issues regarding these terms, 
                  please contact our team via the official support channel.
                </p>
                
                <div className="mt-6">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-md shadow-green-100 active:scale-95"
                  >
                    Message Support Team
                  </Link>
                </div>
                
                {/* Localized Location Badge */}
                <div className="mt-8 pt-4 border-t border-green-100/50 flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] sm:text-xs font-bold text-green-700 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>Chandrapur, Maharashtra</span>
                  </div>
                  <span className="hidden sm:block w-1.5 h-1.5 bg-green-200 rounded-full" />
                  <span>Roomioo Support</span>
                  <span className="hidden sm:block w-1.5 h-1.5 bg-green-200 rounded-full" />
                  <span>Made in India</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}