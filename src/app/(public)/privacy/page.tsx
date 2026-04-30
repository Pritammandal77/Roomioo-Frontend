"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "April 30, 2026"; //[cite: 1]

  const sections = [
    {
      title: "1. Information We Collect",
      icon: <UserCheck className="w-5 h-5 text-green-600" />,
      content: (
        <div className="space-y-2">
          <p>Roomioo collects several types of information from and about users[cite: 1]:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Personal Identifiers:</strong> Your name, email address, phone number, and profile photographs[cite: 1].</li>
            <li><strong>Lifestyle Attributes:</strong> Data regarding habits like smoking, cleanliness, guests, work schedule, and pet ownership[cite: 1, 3].</li>
            <li><strong>Location Information:</strong> Current city data to facilitate local matching[cite: 1, 3].</li>
            <li><strong>Usage Data:</strong> Information on how you interact with the website, including profile matching & search preferences[cite: 1].</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. Use of Your Data",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      content: (
        <div className="space-y-2">
          <p>We use the collected information to[cite: 1]:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Create and maintain your user profile[cite: 1].</li>
            <li>Utilize our matching algorithm to suggest compatible roommates[cite: 1, 3].</li>
            <li>Enable secure communication between users[cite: 1].</li>
            <li>Monitor and improve the safety and security of the platform[cite: 1].</li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Disclosure of Information",
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
      content: (
        <div className="space-y-2">
          <p>Your privacy is our priority, and we share information only in the following ways[cite: 1]:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>User Profiles:</strong> Your first name, lifestyle habits, and general location are visible to registered users[cite: 1].</li>
            <li><strong>Contact Privacy:</strong> Contact details remain private until you explicitly choose to reveal them or grant permission[cite: 1, 3].</li>
            <li><strong>Legal Compliance:</strong> Disclosure may occur if required by Indian law or public authorities[cite: 1].</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Data Security",
      icon: <Lock className="w-5 h-5 text-green-600" />,
      content: (
        <p>
          We implement technical measures and encrypted databases designed to secure your personal information from unauthorized access[cite: 1, 3]. 
          However, please be aware that no system is impenetrable, and users provide information at their own risk[cite: 1].
        </p>
      ),
    },
    {
      title: "5. Your Rights",
      icon: <FileText className="w-5 h-5 text-green-600" />,
      content: (
        <p>
          You have the right to access, edit, or delete your account information at any time through your profile settings[cite: 1]. 
          To permanently delete your data from our servers, you may contact our support team[cite: 1].
        </p>
      ),
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
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-500 italic">Last Updated: {lastUpdated}[cite: 1]</p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Welcome to <strong>Roomioo</strong>. We value your privacy and are committed to protecting your personal data 
              collected through our platform, which connects individuals seeking roommates based on lifestyle preferences[cite: 1, 3].
            </p>
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
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <p className="text-gray-700">If you have questions regarding this policy, contact us at[cite: 1]:</p>
              <div className="mt-4 space-y-1 font-medium text-green-800">
                <p>Email: support@Roomioo.com[cite: 1, 3]</p>
                <p>Location: Pune, India[cite: 1, 3]</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}