"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { User } from "@/types/user";
import { logOutUser } from "@/services/auth.api";
import { useAppDispatch } from "@/lib/rtk/hooks";
import { logout } from "@/lib/rtk/features/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { LogOutIcon, LucideBadgeQuestionMark } from "lucide-react";

interface Props {
  userData: User;
}

export default function ProfileDropdown({ userData }: Props) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [showConfirmLogoutPopup, setShowConfirmLogoutPopup] = useState(false);

  const handleLogOut = async () => {
    try {
      const res = await logOutUser();
      dispatch(logout());
    } catch (error) {
      alert("something went wrong while log out");
    }
  };

  return (
    <>
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
              onClick={() => setShowConfirmLogoutPopup(true)}
              className="w-full text-left px-4 py-2 flex gap-3 items-center text-red-500 hover:bg-red-50 transition"
            >
              <LogOutIcon size={15} />
              Logout
            </button>
          </div>
        )}
      </div>

      {showConfirmLogoutPopup && (
        <div
          className="w-screen h-screen absolute top-0 right-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl"
            style={{ animation: "modalPop 0.3s ease-out" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 text-red-500 rounded-full">
                <LucideBadgeQuestionMark size={20} />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">
                Confirm Logout
              </h1>
            </div>

            {/* Message */}
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to log out? You will need to log in again to
              access your account.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmLogoutPopup(false)}
                className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogOut}
                className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-md hover:shadow-lg"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
