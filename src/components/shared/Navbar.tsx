"use client";

import { setUser } from "@/lib/rtk/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/rtk/hooks";
import { getCurrentUser, logOutUser } from "@/services/auth.api";
import { User } from "@/types/user";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileDropdown from "../ui/ProfileDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const user = useAppSelector((state) => state.user.userData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await getCurrentUser();
        console.log("user data", res.data);
        dispatch(setUser(res.data));
        setUserData(res.data);
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
            href="/"
            className="text-gray-600 hover:text-green-600 transition"
          >
            Home
          </Link>
          <Link
            href="/rooms/new"
            className="text-gray-600 hover:text-green-600 transition"
          >
            List room
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-green-600 transition"
          >
            Contact
          </Link>
        </nav>

        {user ? (
          <ProfileDropdown userData={user} />
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-green-600 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        )}

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
