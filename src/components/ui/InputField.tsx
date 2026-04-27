"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: any;
};

export default function Input({ icon: Icon, type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="relative">
      {/* Left Icon */}
      <Icon className="absolute left-3 top-3 text-green-600" size={18} />

      {/* Input */}
      <input
        {...props}
        type={isPassword && showPassword ? "text" : type}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Toggle Icon (only for password) */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-gray-600"
        >
          {showPassword ? (
            <EyeOff size={18} className="cursor-pointer" />
          ) : (
            <Eye size={18} className="cursor-pointer" />
          )}
        </button>
      )}
    </div>
  );
}
