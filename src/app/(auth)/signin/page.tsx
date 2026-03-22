"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/services/auth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-25 pb-10 bg-linear-to-br from-green-50 to-green-100 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <div className="text-center mb-8">
            <h2 className="text-3xl xl:text-4xl font-semibold text-gray-900">
              Login <span className="text-green-600">Now</span>
            </h2>
            <p className="text-gray-500 mt-2">Welcome back...</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={Mail}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required={true}
            />
            <Input
              icon={Lock}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required={true}
            />

            {/* Submit */}
            <button className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button className="w-full py-3 rounded-lg border border-gray-400 cursor-pointer shadow-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="flex items-center justify-center text-[14px] mt-4">
            <Link href="/signup" className="text-blue-500">
              Do not have any account? Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Input Component */
function Input({ icon: Icon, ...props }: any) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 text-green-600" size={18} />
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
      />
    </div>
  );
}
