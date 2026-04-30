"use client";

import { setUser } from "@/lib/rtk/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/rtk/hooks";
import { getCurrentUser } from "@/services/auth.api";
import { User } from "@/types/user";
import { LogOutIcon, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileDropdown from "../ui/ProfileDropdown";
import Image from "next/image";
import ConfirmLogOutModal from "../ui/ConfirmLogOutModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [showConfirmLogoutPopup, setShowConfirmLogoutPopup] =
    useState<boolean>(false);

  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await getCurrentUser();
        dispatch(setUser(res.data));
        setUserData(res.data);
      } catch (error) {
        console.log("error fetching user");
      }
    };

    fetchLoggedInUser();
  }, []);

  return (
    <>
      <header className="w-full fixed h-17 top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-semibold flex items-center tracking-wide"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <span className="text-gray-900">Roomi</span>
            <span className="text-green-700">oo</span>
          </Link>
          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-green-600">
              Home
            </Link>

            {user && (
              <Link
                href="/listing/new"
                className="text-gray-600 hover:text-green-600"
              >
                List Property
              </Link>
            )}
            <Link
              href="/listings/all"
              className="text-gray-600 hover:text-green-600"
            >
              Explore
            </Link>
            {user && (
              <Link
                href="/chats"
                className="text-gray-600 hover:text-green-600"
              >
                Chats
              </Link>
            )}
          </nav>

          {user ? (
            <ProfileDropdown userData={user} />
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/signin"
                className="text-gray-600 hover:text-green-600"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        {/* 🔥 MOBILE MENU WITH ANIMATION */}
        <div
          className={`md:hidden relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out bg-white border-t border-gray-100
          ${
            isOpen
              ? "max-h-60 opacity-100 translate-y-0 py-4 px-6"
              : "max-h-0 opacity-0 -translate-y-4 px-6"
          }
          `}
        >
          <div className={`space-y-4 ${user && "pb-10"}`}>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-600"
            >
              Home
            </Link>
            <Link
              href="/listings/all"
              onClick={() => setIsOpen(false)}
              className="block text-gray-600"
            >
              Explore
            </Link>
            {user && (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600"
              >
                Profile
              </Link>
            )}

            <Link
              href="/listing/new"
              className="block text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              List Property
            </Link>
            
            {user && (
              <Link
                href="/chats"
                className="block text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Chats
              </Link>
            )}

            {!user && (
              <div className="w-full items-center gap-4">
                <Link href="/signup">
                  <button
                    className="px-4 py-2 w-full rounded-xl bg-green-600 text-white hover:bg-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>

          {userData && (
            <div className="absolute right-0 bottom-0">
              {/* Logout */}
              <button
                onClick={() => {
                  setShowConfirmLogoutPopup(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm  text-gray-700 active:text-red-500 active:bg-red-50 transition-all duration-150"
              >
                <LogOutIcon size={20} className="text-gray-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* BODY BLUR OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* confirm logout popup */}
      {showConfirmLogoutPopup && (
        <ConfirmLogOutModal
          setShowConfirmLogoutPopup={setShowConfirmLogoutPopup}
        />
      )}
    </>
  );
}
