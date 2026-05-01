// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   Mail,
//   Lock,
//   User,
//   Calendar,
//   Users,
//   Camera,
//   PhoneCallIcon,
// } from "lucide-react";
// import Link from "next/link";
// import { registerUser } from "@/services/auth.api";
// import { toast } from "sonner";
// import { sendOtp, verifyOtp } from "@/services/otp.api";
// import { useRouter } from "next/navigation";
// import Input from "@/components/ui/InputField";

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     fullName: "",
//     dob: "",
//     mobileNumber: "",
//     gender: "",
//   });

//   const router = useRouter();

//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [otpArray, setOtpArray] = useState(Array(6).fill(""));
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>("");

//   // HANDLE INPUT CHANGE (reset OTP if email changes)
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;

//     if (name === "email") {
//       setIsOtpSent(false);
//       setIsVerified(false);
//       setTimer(0);
//       setOtpArray(Array(6).fill(""));
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const selected = e.target.files[0];
//       setFile(selected);
//       setPreview(URL.createObjectURL(selected));
//     }
//   };

//   // TIMER EFFECT (correct way)
//   useEffect(() => {
//     if (!isOtpSent || timer <= 0) return;

//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setIsOtpSent(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isOtpSent, timer]);

//   // ✅ SEND OTP
//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       toast.error("Enter email first");
//       return;
//     }

//     try {
//       const res = await sendOtp({ email: formData.email });
//       console.log("send otp", res);
//       toast.success("OTP sent 🚀");
//       setIsOtpSent(true);
//       setTimer(300);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     const otp = otpArray.join("");

//     if (otp.length !== 6) {
//       toast.error("Enter complete OTP");
//       return;
//     }

//     try {
//       await verifyOtp({
//         email: formData.email,
//         otp,
//       });

//       toast.success("Email verified");
//       setIsVerified(true);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Invalid OTP");
//     }
//   };

//   // FINAL SUBMIT
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (!isVerified) {
//       toast.error("Verify email first");
//       return;
//     }

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     if (file) data.append("profilePicture", file);

//     try {
//       await registerUser(data);
//       toast.success("Account created successfully");
//       router.push("/");
//     } catch (error: any) {
//       const message = error?.response?.data?.message || error?.message;

//       toast.error(message);
//     }
//   };

//   const handleOtpChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number,
//   ) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");

//     const newOtp = [...otpArray];
//     newOtp[index] = value;
//     setOtpArray(newOtp);

//     // move forward
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number,
//   ) => {
//     if (e.key === "Backspace") {
//       const newOtp = [...otpArray];

//       if (otpArray[index]) {
//         newOtp[index] = "";
//         setOtpArray(newOtp);
//       } else if (index > 0) {
//         inputRefs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     const pasteData = e.clipboardData.getData("text").slice(0, 6);

//     if (!/^\d+$/.test(pasteData)) return;

//     const newOtp = pasteData.split("");
//     setOtpArray([...newOtp, ...Array(6 - newOtp.length).fill("")]);

//     // focus last filled input
//     const lastIndex = newOtp.length - 1;
//     if (lastIndex >= 0) {
//       inputRefs.current[lastIndex]?.focus();
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center pt-10 pb-10 bg-linear-to-br from-green-50 to-green-100 px-4">
//       <div className="w-full max-w-xl">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl xl:text-4xl font-semibold text-gray-900">
//             Create <span className="text-green-600">Account</span>
//           </h2>
//           <p className="text-gray-500 mt-2">Find your perfect housemate</p>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//           {/* Avatar */}
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
//                 <img
//                   src={
//                     preview ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer">
//                 <Camera size={16} className="text-white" />
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               icon={User}
//               name="fullName"
//               placeholder="Full Name"
//               onChange={handleChange}
//             />

//             {/* EMAIL + OTP */}
//             <div className="space-y-4">
//               {/* EMAIL FIELD */}
//               <div className="relative flex gap-3">
//                 <div className="flex-1">
//                   <Input
//                     icon={Mail}
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   disabled={timer > 0}
//                   className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-medium shadow hover:bg-green-700 disabled:bg-gray-400 transition"
//                 >
//                   {timer > 0
//                     ? `Resend in ${Math.floor(timer / 60)}:${(timer % 60)
//                         .toString()
//                         .padStart(2, "0")}`
//                     : "Send OTP"}
//                 </button>
//               </div>

//               {/* OTP SECTION */}
//               {isOtpSent && !isVerified && (
//                 <div className="space-y-4 flex flex-col">
//                   {/* 6 OTP BOXES */}
//                   <div className="flex justify-between gap-1">
//                     {otpArray.map((digit, index) => (
//                       <input
//                         key={index}
//                         ref={(el) => {
//                           if (el) inputRefs.current[index] = el;
//                         }}
//                         type="text"
//                         maxLength={1}
//                         value={digit}
//                         onChange={(e) => handleOtpChange(e, index)}
//                         onKeyDown={(e) => handleKeyDown(e, index)}
//                         onPaste={handlePaste}
//                         className="w-12 h-12 text-center text-lg font-semibold border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
//                       />
//                     ))}

//                     <button
//                       type="button"
//                       onClick={handleVerifyOtp}
//                       className="hidden xl:inline px-5 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
//                     >
//                       Verify OTP
//                     </button>
//                   </div>

//                   {/* VERIFY + TIMER */}
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">
//                       {Math.floor(timer / 60)}:
//                       {(timer % 60).toString().padStart(2, "0")}
//                     </span>

//                     <button
//                       type="button"
//                       onClick={handleVerifyOtp}
//                       className="xl:hidden px-5 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
//                     >
//                       Verify OTP
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <Input
//               icon={Lock}
//               name="password"
//               type="password"
//               placeholder="Password"
//               onChange={handleChange}
//             />
//             <Input
//               icon={Lock}
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//             />

//             <div className="flex gap-4">
//               <input
//                 type="date"
//                 name="dob"
//                 onChange={handleChange}
//                 className="w-full border border-gray-400 p-3 rounded"
//               />
//               <select
//                 name="gender"
//                 onChange={handleChange}
//                 className="w-full border border-gray-400 p-3 rounded"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="others">Others</option>
//               </select>
//             </div>

//             <Input
//               icon={PhoneCallIcon}
//               name="mobileNumber"
//               type="number"
//               placeholder="Mobile"
//               onChange={handleChange}
//             />

//             <button
//               type="submit"
//               disabled={!isVerified}
//               className="w-full py-3 bg-green-600 text-white rounded disabled:bg-gray-400"
//             >
//               Create Account
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <Link href="/signin" className="text-blue-500">
//               Already have an account?
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }






"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Camera,
  PhoneCallIcon,
} from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/services/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/InputField";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dob: "",
    mobileNumber: "",
    gender: "",
  });

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (file) data.append("profilePicture", file);

    try {
      await registerUser(data);
      toast.success("Account created successfully");
      router.push("/");
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;
      toast.error(message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-10 pb-10 bg-linear-to-br from-green-50 to-green-100 px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl xl:text-4xl font-semibold text-gray-900">
            Create <span className="text-green-600">Account</span>
          </h2>
          <p className="text-gray-500 mt-2">Find your perfect housemate</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Avatar Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  alt="Preview"
                  src={
                    preview ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={User}
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <Input
              icon={Mail}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <Input
              icon={Lock}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <Input
              icon={Lock}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

            <div className="flex gap-4">
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="w-full border border-gray-400 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />
              <select
                name="gender"
                onChange={handleChange}
                className="w-full border border-gray-400 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <Input
              icon={PhoneCallIcon}
              name="mobileNumber"
              type="number"
              placeholder="Mobile"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/signin" className="text-blue-500 hover:underline">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}