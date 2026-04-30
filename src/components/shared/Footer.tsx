"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-t from-green-200 to-green-200 border-t border-gray-200 px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-green-600">Roomioo</h2>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Find your perfect housemate based on lifestyle, habits, and vibe.
            Making shared living simple, safe, and smarter.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
            Product
          </h3>
          <ul className="mt-4 space-y-3 text-gray-600 text-sm">
            <li>
              <Link href="/" className="hover:text-green-600 transition">
                Find Housemate
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-green-600 transition">
                List Your Space
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-green-600 transition">
                How it Works
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-gray-600 text-sm">
            <li>
              <Link href="/about" className="hover:text-green-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-green-600 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-green-600 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
            Contact
          </h3>

          <div className="mt-4 space-y-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@Roomioo.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Pune, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Roomioo. All rights reserved.</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-green-600 transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-green-600 transition">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
