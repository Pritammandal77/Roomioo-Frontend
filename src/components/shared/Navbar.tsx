"use client";

import { getCurrentUser, logOutUser } from "@/services/auth";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await getCurrentUser();
        console.log(res);
      } catch (error) {
        console.log("something went wrong while getting fetching the user");
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await logOutUser();
      console.log(res);
    } catch (error) {
      alert("something went wrong while log out");
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          Roomio
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-gray-600 hover:text-green-600 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-green-600 transition"
          >
            Contact
          </Link>
        </nav>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/signin"
            className="text-gray-600 hover:text-green-600 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
          >
            Get Started
          </Link>

          <button
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-sm"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white border-t border-gray-100">
          <Link href="/about" className="block text-gray-600">
            About
          </Link>
          <Link href="/contact" className="block text-gray-600">
            Contact
          </Link>
          <Link href="/signin" className="block text-gray-600">
            Login
          </Link>
          <Link
            href="/signup"
            className="block bg-green-600 text-white text-center py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
