// "use client";

// import { useState } from "react";
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

//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selected = e.target.files[0];
//       setFile(selected);

//       // preview image
//       const imageUrl = URL.createObjectURL(selected);
//       setPreview(imageUrl);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       data.append(key, value);
//     });

//     data.append("authProvider", "email");

//     if (file) data.append("profilePicture", file);

//     try {
//       const res = await registerUser(data);
//       console.log(res);
//       toast.success("Account created successfully");
//     } catch (error) {
//       toast.error("somthing went wrong");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center pt-25 pb-10 bg-linear-to-br from-green-50 to-green-100 px-4">
//       <div className="w-full max-w-xl">
//         {/* Heading */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl xl:text-4xl font-semibold text-gray-900">
//             Create <span className="text-green-600">Account</span>
//           </h2>
//           <p className="text-gray-500 mt-2">Find your perfect housemate</p>
//         </div>

//         {/* Card */}
//         <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//           {/* Avatar Upload */}
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               {/* Image Circle */}
//               <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
//                 <img
//                   src={
//                     preview ||
//                     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   alt="avatar"
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Edit Button */}
//               <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700 transition shadow">
//                 <Camera size={16} className="text-white" />
//                 <input
//                   type="file"
//                   accept="image/png, image/jpeg"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   required={true}
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               icon={User}
//               name="fullName"
//               placeholder="Full Name"
//               onChange={handleChange}
//               required={true}
//             />
//             <Input
//               icon={Mail}
//               name="email"
//               type="email"
//               placeholder="Email"
//               onChange={handleChange}
//               required={true}
//             />
//             <Input
//               icon={Lock}
//               name="password"
//               type="password"
//               placeholder="Password"
//               onChange={handleChange}
//               required={true}
//             />
//             <Input
//               icon={Lock}
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//               required={true}
//             />
//             <div className="flex flex-col md:flex-row gap-5">
//               <div className="relative">
//                 <Calendar
//                   className="absolute left-3 top-3 text-green-600"
//                   size={18}
//                 />
//                 <input
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
//                   required={true}
//                 />
//               </div>
//               <Input
//                 icon={PhoneCallIcon}
//                 name="mobileNumber"
//                 type="number"
//                 placeholder="Mobile Number"
//                 onChange={handleChange}
//                 required={true}
//               />
//             </div>

//             {/* Gender */}
//             <div className="relative">
//               <Users
//                 className="absolute left-3 top-3 text-green-500"
//                 size={18}
//               />
//               <select
//                 name="gender"
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
//                 required={true}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="others">Others</option>
//               </select>
//             </div>

//             {/* Submit */}
//             <button className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
//               Create Account
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-6">
//             <div className="flex-1 h-px bg-gray-200"></div>
//             <span className="text-gray-400 text-sm">OR</span>
//             <div className="flex-1 h-px bg-gray-200"></div>
//           </div>

//           {/* Google */}
//           <button className="w-full py-3 rounded-lg border border-gray-400 cursor-pointer shadow-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               className="w-5 h-5"
//             />
//             Continue with Google
//           </button>

//           <div className="flex items-center justify-center text-[14px] mt-4">
//             <Link href="/signin" className="text-blue-500">
//               Already have an account? Log in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* Input Component */
// function Input({ icon: Icon, ...props }: any) {
//   return (
//     <div className="relative">
//       <Icon className="absolute left-3 top-3 text-green-600" size={18} />
//       <input
//         {...props}
//         className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none text-gray-800"
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  User,
  Calendar,
  Users,
  Camera,
  PhoneCallIcon,
} from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/services/auth.api";
import { toast } from "sonner";
import { sendOtp, verifyOtp } from "@/services/otp.api";

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

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // ✅ HANDLE INPUT CHANGE (reset OTP if email changes)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "email") {
      setIsOtpSent(false);
      setIsVerified(false);
      setOtp("");
      setTimer(0);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // TIMER EFFECT (correct way)
  useEffect(() => {
    if (!isOtpSent || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsOtpSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  // ✅ SEND OTP
  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Enter email first");
      return;
    }

    try {
      const res = await sendOtp({ email: formData.email });
      console.log("send otp", res);
      toast.success("OTP sent 🚀");
      setIsOtpSent(true);
      setTimer(300);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      const res = await verifyOtp({
        email: formData.email,
        otp,
      });
      console.log("verify", res);
      toast.success("Email verified ✅");
      setIsVerified(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    }
  };

  // FINAL SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isVerified) {
      toast.error("Verify email first");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (file) data.append("profilePicture", file);

    try {
      await registerUser(data);
      toast.success("Account created successfully 🎉");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-25 pb-10 bg-linear-to-br from-green-50 to-green-100 px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl xl:text-4xl font-semibold text-gray-900">
            Create <span className="text-green-600">Account</span>
          </h2>
          <p className="text-gray-500 mt-2">Find your perfect housemate</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <img
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
                />
              </label>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={User}
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />

            {/* EMAIL + OTP */}
            <div className="relative">
              <Input
                icon={Mail}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isOtpSent && timer > 0}
                className="absolute right-2 top-2 text-sm bg-green-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
              >
                {isOtpSent ? "Sent" : "Verify"}
              </button>
            </div>

            {isOtpSent && !isVerified && (
              <div className="space-y-2">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border p-3 rounded text-center tracking-widest"
                />

                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="text-green-600"
                  >
                    Verify OTP
                  </button>

                  <span>
                    {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            )}

            <Input
              icon={Lock}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Input
              icon={Lock}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            <div className="flex gap-4">
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
              <Input
                icon={PhoneCallIcon}
                name="mobileNumber"
                type="number"
                placeholder="Mobile"
                onChange={handleChange}
              />
            </div>

            <select
              name="gender"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>

            <button
              type="submit"
              disabled={!isVerified}
              className="w-full py-3 bg-green-600 text-white rounded disabled:bg-gray-400"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/signin" className="text-blue-500">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ icon: Icon, ...props }: any) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 text-green-600" size={18} />
      <input {...props} className="w-full pl-10 pr-4 py-3 border rounded" />
    </div>
  );
}
