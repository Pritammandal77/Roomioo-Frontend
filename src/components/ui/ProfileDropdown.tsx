"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { User } from "@/types/user";
import { logOutUser } from "@/services/auth";
import { useAppDispatch } from "@/lib/rtk/hooks";
import { logout } from "@/lib/rtk/features/userSlice";

interface Props {
  userData: User;
}

export default function ProfileDropdown({ userData }: Props) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      const res = await logOutUser();
      dispatch(logout());
    } catch (error) {
      alert("something went wrong while log out");
    }
  };

  return (
    <div
      className="hidden md:flex relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Profile Image */}
      <div
        className="relative w-10 h-10 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={userData.profilePicture || ""}
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-green-500"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-0 w-48 bg-white border border-green-100 rounded-xl shadow-lg overflow-hidden animate-slideDown">
          {/* User Info */}
          <div className="px-4 py-3 border-b bg-green-50">
            <p className="text-sm font-semibold text-green-700">
              {userData?.fullName}
            </p>
          </div>

          {/* Links */}
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
          >
            Profile
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogOut}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
