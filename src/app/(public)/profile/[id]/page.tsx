"use client";
import { getUserById } from "@/services/auth.api";
import { PreferenceData } from "@/types/preference";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "../../../../types/user";
import { LucideBadgeQuestionMark, MessageCircleCode } from "lucide-react";
import { createOrFetchChat } from "@/services/chat.api";

function page() {
  const { id } = useParams();

  const [userData, setUserData] = useState<User | null>(null);
  const [userPreference, setUserPreference] = useState<PreferenceData | null>(
    null,
  );

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setUserData(res.data?.user);
        setUserPreference(res.data?.preference);
        console.log("user data", res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleCreateOrFetchChat = async (id: string) => {
    try {
      const res = await createOrFetchChat(id);
      router.push(`/chats/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="min-h-screen pt-20 xl:pt-30 bg-linear-to-br from-green-100 via-[#c7f9c6] to-emerald-100 text-gray-800">
    <div className="min-h-screen pt-20 xl:pt-30 bg-linear-to-br from-green-50 via-[#ddfddd] to-emerald-100 text-gray-800">
      <div className="max-w-7xl mx-auto p-3 space-y-3 md:space-y-6">
        {/* TOP PROFILE STRIP */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <img
              src={userData?.profilePicture}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-400"
            />

            <div>
              <h1 className="text-2xl font-bold">{userData?.fullName}</h1>
              <p className="text-sm text-gray-500">{userData?.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Joined {formatDate(userData ? userData.createdAt : "")}
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 MAIN LAYOUT */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-3 md:space-y-6">
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-lg text-gray-700 font-semibold">
                Basic Info
              </h3>
              <Info label="Gender" value={userData?.gender} />
              {userData && (
                <Info label="DOB" value={formatDate(userData.dob)} />
              )}
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-lg text-gray-700 font-semibold">Contact</h3>
              <Info label="Email" value={userData?.email} />
              <Info label="Mobile" value={userData?.mobileNumber} />
            </div>

            <button
              className="bg-green-500 font-semibold flex items-center justify-center gap-3 w-full py-3 rounded-xl"
              onClick={() => handleCreateOrFetchChat(id as string)}
            >
              <MessageCircleCode size={18} /> Start Chat
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-3 md:space-y-6">
            {userPreference ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    Your Preferences
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <GlassCard title="Budget">
                      ₹{userPreference.budget.min} - ₹
                      {userPreference.budget.max}
                    </GlassCard>

                    <GlassCard title="Occupation">
                      {userPreference.occupation}
                    </GlassCard>

                    <GlassCard title="Personality">
                      {userPreference.personality}
                    </GlassCard>

                    {userPreference.workStyle && (
                      <GlassCard title="Work Style">
                        {userPreference.workStyle}
                      </GlassCard>
                    )}

                    <GlassCard title="Food">
                      {userPreference.lifestyle.foodPreference}
                    </GlassCard>

                    <GlassCard title="Sleep">
                      {userPreference.lifestyle.sleepSchedule}
                    </GlassCard>

                    <GlassCard title="Cleanliness">
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div
                            key={n}
                            className={`w-3 h-3 rounded-full ${
                              n <= userPreference.lifestyle.cleanliness
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </GlassCard>

                    <GlassCard title="Lifestyle">
                      <div className="flex flex-wrap gap-2">
                        {userPreference.lifestyle.smoking && (
                          <Tag text="Smoking" />
                        )}
                        {userPreference.lifestyle.drinking && (
                          <Tag text="Drinking" />
                        )}
                        {userPreference.lifestyle.pets && <Tag text="Pets" />}
                      </div>
                    </GlassCard>

                    <GlassCard title="Preferred Gender">
                      {userPreference.gender}
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-10 py-27 shadow-sm flex flex-col items-center justify-center text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <LucideBadgeQuestionMark size={28} />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800">
                  No Preferences Added
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
                  User haven’t set preferences yet.
                </p>

              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

/* COMPONENTS */

function Info({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

function GlassCard({ title, children }: any) {
  return (
    <div className="bg-white/80 border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <p className="text-xs text-gray-500 mb-1">{title}</p>
      <div className="font-semibold text-[13px] md:text-[16px] text-gray-800">
        {children}
      </div>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
      {text}
    </span>
  );
}































// "use client";
// import { getUserById } from "@/services/auth.api";
// import { PreferenceData } from "@/types/preference";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import { User } from "../../../../types/user";
// import {
//   LucideBadgeQuestionMark,
//   MessageCircleCode,
//   Mail,
//   Phone,
//   Calendar,
//   Venus,
//   Mars,
//   Briefcase,
//   Brain,
//   Utensils,
//   Moon,
//   Sparkles,
//   Wallet,
//   Users,
//   Laptop,
//   ChevronRight,
//   Cigarette,
//   Wine,
//   PawPrint,
// } from "lucide-react";
// import { createOrFetchChat } from "@/services/chat.api";

// /* ─────────────── TYPES ─────────────── */
// interface Props {}

// /* ─────────────── PAGE ─────────────── */
// function page({}: Props) {
//   const { id } = useParams();
//   const [userData, setUserData] = useState<User | null>(null);
//   const [userPreference, setUserPreference] = useState<PreferenceData | null>(null);
//   const [loaded, setLoaded] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getUserById(id);
//         setUserData(res.data?.user);
//         setUserPreference(res.data?.preference);
//         console.log("user data", res);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoaded(true);
//       }
//     };
//     fetchUser();
//   }, []);

//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const handleCreateOrFetchChat = async (id: string) => {
//     try {
//       const res = await createOrFetchChat(id);
//       router.push(`/chats/${res.data._id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {/* ── FONTS ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

//         .roo-root * { box-sizing: border-box; }

//         .roo-root {
//           font-family: 'Cabinet Grotesk', sans-serif;
//           --green-50:  #f0fdf4;
//           --green-100: #dcfce7;
//           --green-200: #bbf7d0;
//           --green-300: #86efac;
//           --green-400: #4ade80;
//           --green-500: #22c55e;
//           --green-600: #16a34a;
//           --green-700: #15803d;
//           --green-800: #166534;
//           --green-900: #14532d;
//           --stone-50:  #fafaf9;
//           --stone-100: #f5f5f4;
//           --stone-200: #e7e5e4;
//           --stone-300: #d6d3d1;
//           --stone-400: #a8a29e;
//           --stone-500: #78716c;
//           --stone-600: #57534e;
//           --stone-700: #44403c;
//           --stone-800: #292524;
//           --stone-900: #1c1917;
//         }

//         .roo-cover {
//           position: relative;
//           overflow: hidden;
//         }

//         .roo-cover-pattern {
//           position: absolute;
//           inset: 0;
//           background-image:
//             radial-gradient(circle at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 50%),
//             radial-gradient(circle at 80% 20%, rgba(134,239,172,0.12) 0%, transparent 45%),
//             radial-gradient(circle at 60% 80%, rgba(22,163,74,0.06) 0%, transparent 40%);
//           pointer-events: none;
//         }

//         .roo-cover-dots {
//           position: absolute;
//           inset: 0;
//           background-image: radial-gradient(circle, rgba(34,197,94,0.15) 1px, transparent 1px);
//           background-size: 28px 28px;
//           pointer-events: none;
//           mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
//         }

//         .roo-avatar-ring {
//           background: conic-gradient(
//             #22c55e 0deg,
//             #4ade80 90deg,
//             #86efac 180deg,
//             #22c55e 360deg
//           );
//           border-radius: 50%;
//           padding: 3px;
//         }

//         .roo-avatar-inner {
//           background: white;
//           border-radius: 50%;
//           padding: 3px;
//         }

//         .roo-tag {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           padding: 5px 13px;
//           border-radius: 999px;
//           font-size: 13px;
//           font-weight: 500;
//           background: var(--green-50);
//           color: var(--green-800);
//           border: 1px solid var(--green-200);
//           white-space: nowrap;
//           transition: all 0.2s ease;
//         }

//         .roo-tag:hover {
//           background: var(--green-100);
//           border-color: var(--green-300);
//           transform: translateY(-1px);
//         }

//         .roo-tag.lifestyle {
//           background: #fff7ed;
//           color: #9a3412;
//           border-color: #fed7aa;
//         }

//         .roo-tag.lifestyle:hover {
//           background: #ffedd5;
//           border-color: #fb923c;
//         }

//         .roo-pref-card {
//           background: white;
//           border: 1px solid var(--stone-400);
//           border-radius: 16px;
//           padding: 18px 20px;
//           transition: all 0.25s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .roo-pref-card::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 3px;
//           background: linear-gradient(90deg, var(--green-400), var(--green-600));
//           opacity: 0;
//           transition: opacity 0.25s;
//         }

//         .roo-pref-card:hover {
//           border-color: var(--green-300);
//           box-shadow: 0 8px 24px rgba(34,197,94,0.12);
//           transform: translateY(-2px);
//         }

//         .roo-pref-card:hover::before {
//           opacity: 1;
//         }

//         .roo-info-row {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px 0;
//           border-bottom: 1px solid var(--stone-100);
//         }

//         .roo-info-row:last-child {
//           border-bottom: none;
//           padding-bottom: 0;
//         }

//         .roo-info-icon {
//           width: 34px;
//           height: 34px;
//           border-radius: 10px;
//           background: var(--green-50);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           color: var(--green-700);
//         }

//         .roo-budget-bar {
//           height: 6px;
//           border-radius: 999px;
//           background: var(--green-100);
//           overflow: hidden;
//           margin-top: 10px;
//         }

//         .roo-budget-fill {
//           height: 100%;
//           border-radius: 999px;
//           background: linear-gradient(90deg, var(--green-400), var(--green-600));
//           width: 65%;
//         }

//         .roo-clean-segment {
//           flex: 1;
//           height: 8px;
//           border-radius: 999px;
//           transition: all 0.4s ease;
//         }

//         .roo-scroll-tags {
//           display: flex;
//           gap: 8px;
//           flex-wrap: wrap;
//         }

//         .roo-section-title {
//           font-family: 'Instrument Serif', serif;
//           font-style: italic;
//           color: var(--stone-400);
//           font-size: 13px;
//           letter-spacing: 0.04em;
//           text-transform: uppercase;
//           margin-bottom: 6px;
//         }

//         .roo-btn-chat {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 12px 24px;
//           background: var(--green-600);
//           color: white;
//           border-radius: 14px;
//           font-weight: 600;
//           font-size: 14px;
//           cursor: pointer;
//           border: none;
//           transition: all 0.2s ease;
//           font-family: 'Cabinet Grotesk', sans-serif;
//           position: relative;
//           overflow: hidden;
//         }

//         .roo-btn-chat::after {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
//           opacity: 0;
//           transition: opacity 0.2s;
//         }

//         .roo-btn-chat:hover {
//           background: var(--green-700);
//           transform: translateY(-2px);
//           box-shadow: 0 12px 32px rgba(22,163,74,0.3);
//         }

//         .roo-btn-chat:hover::after { opacity: 1; }
//         .roo-btn-chat:active { transform: translateY(0); }

//         .roo-sidebar-card {
//           background: white;
//           border: 1px solid var(--stone-300);
//           border-radius: 20px;
//           overflow: hidden;
//         }

//         .roo-sidebar-header {
//           padding: 16px 20px;
//           border-bottom: 1px solid var(--stone-100);
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .roo-sidebar-body {
//           padding: 8px 20px 16px;
//         }

//         .roo-cover-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 4px 12px;
//           background: var(--green-100);
//           color: var(--green-800);
//           border-radius: 999px;
//           font-size: 12px;
//           font-weight: 600;
//           border: 1px solid var(--green-200);
//         }

//         /* Skeleton shimmer */
//         @keyframes shimmer {
//           0% { background-position: -200% 0; }
//           100% { background-position: 200% 0; }
//         }
//         .roo-skeleton {
//           background: linear-gradient(90deg, var(--stone-100) 25%, var(--stone-50) 50%, var(--stone-100) 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.5s infinite;
//           border-radius: 8px;
//         }

//         @media (max-width: 768px) {
//           .roo-grid { grid-template-columns: 1fr !important; }
//           .roo-pref-grid { grid-template-columns: 1fr 1fr !important; }
//         }
//       `}</style>

//       <div
//         className="roo-root min-h-screen pt-20 xl:pt-28"
//         style={{ background: "var(--stone-50)" }}
//       >
//         {/* ═══════════════════════════════════════
//             COVER SECTION
//         ═══════════════════════════════════════ */}
//         <div
//           className="roo-cover"
//           style={{
//             background: "white",
//             borderBottom: "1px solid var(--stone-200)",
//           }}
//         >
//           <div className="roo-cover-dots" />
//           <div className="roo-cover-pattern" />

//           <div
//             className="relative"
//             style={{
//               maxWidth: 1100,
//               margin: "0 auto",
//               padding: "40px 24px 36px",
//             }}
//           >
//             <div 
//             // style={{ display: "flex",  alignItems: "flex-start", gap: 28, flexWrap: "wrap" }}
//             className="flex flex-col xl:flex-row items-center xl:items-start gap-7 flex-wrap">
//               {/* ── Avatar ── */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.85 }}
//                 animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.85 }}
//                 transition={{ duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
//                 style={{ flexShrink: 0 }}
//               >
//                 <div className="roo-avatar-ring" style={{ width: 112, height: 112 }}>
//                   <div className="roo-avatar-inner">
//                     <img
//                       src={userData?.profilePicture}
//                       alt="Profile"
//                       style={{
//                         width: 98,
//                         height: 98,
//                         borderRadius: "50%",
//                         objectFit: "cover",
//                         display: "block",
//                       }}
//                     />
//                   </div>
//                 </div>
//               </motion.div>

//               {/* ── Name + meta ── */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -20 }}
//                 transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
//                 style={{ flex: 1, minWidth: 200 }}
//                 className="flex flex-col items-center justify-center xl:items-start"
//               >
//                 <div style={{ marginBottom: 8 }}>
//                   <span className="roo-cover-badge">
//                     <span
//                       style={{
//                         width: 6,
//                         height: 6,
//                         borderRadius: "50%",
//                         background: "var(--green-500)",
//                         display: "inline-block",
//                       }}
//                     />
//                     Roomioo Member
//                   </span>
//                 </div>

//                 <h1
//                   style={{
//                     fontFamily: "'Cabinet Grotesk', sans-serif",
//                     fontSize: "clamp(28px, 4vw, 42px)",
//                     fontWeight: 800,
//                     color: "var(--stone-900)",
//                     margin: "0 0 8px",
//                     lineHeight: 1.1,
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   {loaded ? userData?.fullName : (
//                     <span className="roo-skeleton" style={{ display: "block", height: 40, width: 260 }} />
//                   )}
//                 </h1>

//                 {/* Meta chips */}
//                 <div 
//                 // style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}
//                 className="flex flex-wrap items-center justify-center gap-2 mt-3"
//                 >
//                   <MetaChip icon={<Mail size={12} />}>
//                     {userData?.email ?? "—"}
//                   </MetaChip>
//                   <MetaChip icon={<Phone size={12} />}>
//                     {userData?.mobileNumber ?? "—"}
//                   </MetaChip>
//                   <MetaChip icon={<Calendar size={12} />}>
//                     Joined {userData ? formatDate(userData.createdAt) : "—"}
//                   </MetaChip>
//                 </div>
//               </motion.div>

//               {/* ── CTA ── */}
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
//                 transition={{ duration: 0.5, delay: 0.18 }}
//                 style={{ alignSelf: "center" }}
//               >
//                 <button
//                   className="roo-btn-chat"
//                   onClick={() => handleCreateOrFetchChat(id as string)}
//                 >
//                   <MessageCircleCode size={16} />
//                   Start Chat
//                   <ChevronRight size={14} />
//                 </button>
//               </motion.div>
//             </div>
//           </div>
//         </div>

//         {/* ═══════════════════════════════════════
//             BODY
//         ═══════════════════════════════════════ */}
//         <div
//           style={{
//             maxWidth: 1100,
//             margin: "0 auto",
//             padding: "28px 24px 60px",
//           }}
//         >
//           <div
//             className="roo-grid"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "280px 1fr",
//               gap: 24,
//               alignItems: "start",
//             }}
//           >
//             {/* ══════════════
//                 SIDEBAR
//             ══════════════ */}
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -24 }}
//               transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//               style={{ display: "flex", flexDirection: "column", gap: 16 }}
//             >
//               {/* Basic Info */}
//               <div className="roo-sidebar-card">
//                 <div className="roo-sidebar-header">
//                   <span style={{ color: "var(--green-600)", display: "flex" }}>
//                     <Users size={15} />
//                   </span>
//                   <span style={{ fontWeight: 700, fontSize: 14, color: "var(--stone-700)" }}>
//                     Basic Info
//                   </span>
//                 </div>
//                 <div className="roo-sidebar-body">
//                   <InfoRow
//                     icon={userData?.gender === "Female" ? <Venus size={14} /> : <Mars size={14} />}
//                     label="Gender"
//                     value={userData?.gender}
//                   />
//                   <InfoRow
//                     icon={<Calendar size={14} />}
//                     label="Date of Birth"
//                     value={userData ? formatDate(userData.dob) : undefined}
//                   />
//                 </div>
//               </div>

//               {/* Contact */}
//               <div className="roo-sidebar-card">
//                 <div className="roo-sidebar-header">
//                   <span style={{ color: "var(--green-600)", display: "flex" }}>
//                     <Mail size={15} />
//                   </span>
//                   <span style={{ fontWeight: 700, fontSize: 14, color: "var(--stone-700)" }}>
//                     Contact
//                   </span>
//                 </div>
//                 <div className="roo-sidebar-body">
//                   <InfoRow icon={<Mail size={14} />} label="Email" value={userData?.email} />
//                   <InfoRow icon={<Phone size={14} />} label="Mobile" value={userData?.mobileNumber} />
//                 </div>
//               </div>

//               {/* Quick stat — score ring */}
//               <div
//                 className="roo-sidebar-card"
//                 style={{ padding: "20px", textAlign: "center" }}
//               >
//                 <ScoreRing score={userPreference ? 92 : 0} />
//                 <p
//                   style={{
//                     fontSize: 12,
//                     color: "var(--stone-400)",
//                     marginTop: 8,
//                     fontStyle: "italic",
//                   }}
//                 >
//                   Profile completion
//                 </p>
//               </div>
//             </motion.div>

//             {/* ══════════════
//                 MAIN CONTENT
//             ══════════════ */}
//             <AnimatePresence mode="wait">
//               {userPreference ? (
//                 <motion.div
//                   key="prefs"
//                   initial={{ opacity: 0, y: 24 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -16 }}
//                   transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//                   style={{ display: "flex", flexDirection: "column", gap: 20 }}
//                 >
//                   {/* ── Section header ── */}
//                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <Sparkles size={16} color="var(--green-500)" />
//                     <p className="roo-section-title" style={{ margin: 0 }}>
//                       Lifestyle Preferences
//                     </p>
//                     <div
//                       style={{
//                         flex: 1,
//                         height: 1,
//                         background: "var(--stone-200)",
//                         marginLeft: 4,
//                       }}
//                     />
//                   </div>

//                   {/* ── Budget — hero card ── */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.22 }}
//                   >
//                     <div
//                       style={{
//                         background:
//                           "linear-gradient(135deg, var(--green-600) 0%, var(--green-800) 100%)",
//                         borderRadius: 20,
//                         padding: "24px 28px",
//                         color: "white",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 20,
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 48,
//                           height: 48,
//                           borderRadius: 14,
//                           background: "rgba(255,255,255,0.15)",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           flexShrink: 0,
//                         }}
//                       >
//                         <Wallet size={22} />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <p
//                           style={{
//                             fontSize: 12,
//                             opacity: 0.7,
//                             margin: "0 0 4px",
//                             fontWeight: 500,
//                             letterSpacing: "0.06em",
//                             textTransform: "uppercase",
//                           }}
//                         >
//                           Monthly Budget Range
//                         </p>
//                         <p
//                           style={{
//                             fontSize: 28,
//                             fontWeight: 800,
//                             margin: 0,
//                             letterSpacing: "-0.02em",
//                           }}
//                         >
//                           ₹{userPreference.budget.min.toLocaleString("en-IN")}
//                           <span style={{ opacity: 0.5, fontWeight: 400, fontSize: 20, margin: "0 6px" }}>
//                             –
//                           </span>
//                           ₹{userPreference.budget.max.toLocaleString("en-IN")}
//                         </p>
//                         <div className="roo-budget-bar" style={{ background: "rgba(255,255,255,0.2)" }}>
//                           <div
//                             className="roo-budget-fill"
//                             style={{ background: "rgba(255,255,255,0.7)" }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* ── Pref cards grid ── */}
//                   <div
//                     className="roo-pref-grid"
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(3, 1fr)",
//                       gap: 14,
//                     }}
//                   >
//                     {([
//                       {
//                         icon: <Briefcase size={16} />,
//                         label: "Occupation",
//                         value: userPreference.occupation,
//                         delay: 0.25,
//                       },
//                       {
//                         icon: <Brain size={16} />,
//                         label: "Personality",
//                         value: userPreference.personality,
//                         delay: 0.3,
//                       },
//                       ...(userPreference.workStyle
//                         ? [
//                             {
//                               icon: <Laptop size={16} />,
//                               label: "Work Style",
//                               value: userPreference.workStyle,
//                               delay: 0.35,
//                             },
//                           ]
//                         : []),
//                       {
//                         icon: <Utensils size={16} />,
//                         label: "Food Preference",
//                         value: userPreference.lifestyle.foodPreference,
//                         delay: 0.4,
//                       },
//                       {
//                         icon: <Moon size={16} />,
//                         label: "Sleep Schedule",
//                         value: userPreference.lifestyle.sleepSchedule,
//                         delay: 0.45,
//                       },
//                       {
//                         icon: <Users size={16} />,
//                         label: "Preferred Gender",
//                         value: userPreference.gender,
//                         delay: 0.5,
//                       },
//                     ] as { icon: React.ReactNode; label: string; value: string; delay: number }[]).map(
//                       (item) => (
//                         <motion.div
//                           key={item.label}
//                           initial={{ opacity: 0, y: 12 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: item.delay }}
//                           className="roo-pref-card"
//                         >
//                           <div
//                             style={{
//                               width: 36,
//                               height: 36,
//                               borderRadius: 10,
//                               background: "var(--green-50)",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               color: "var(--green-700)",
//                               marginBottom: 12,
//                             }}
//                           >
//                             {item.icon}
//                           </div>
//                           <p
//                             style={{
//                               fontSize: 11,
//                               fontWeight: 600,
//                               color: "var(--stone-400)",
//                               textTransform: "uppercase",
//                               letterSpacing: "0.07em",
//                               margin: "0 0 4px",
//                             }}
//                           >
//                             {item.label}
//                           </p>
//                           <p
//                             style={{
//                               fontSize: 16,
//                               fontWeight: 700,
//                               color: "var(--stone-800)",
//                               margin: 0,
//                             }}
//                           >
//                             {item.value}
//                           </p>
//                         </motion.div>
//                       )
//                     )}
//                   </div>

//                   {/* ── Cleanliness + Lifestyle row ── */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.55 }}
//                     style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
//                   >
//                     {/* Cleanliness */}
//                     <div
//                       className="roo-pref-card"
//                       style={{ background: "var(--green-50)", borderColor: "var(--green-200)" }}
//                     >
//                       <p
//                         style={{
//                           fontSize: 11,
//                           fontWeight: 600,
//                           color: "var(--green-700)",
//                           textTransform: "uppercase",
//                           letterSpacing: "0.07em",
//                           margin: "0 0 14px",
//                         }}
//                       >
//                         Cleanliness Level
//                       </p>
//                       <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
//                         {[1, 2, 3, 4, 5].map((n) => (
//                           <motion.div
//                             key={n}
//                             initial={{ scaleX: 0 }}
//                             animate={{ scaleX: 1 }}
//                             transition={{ delay: 0.6 + n * 0.06, ease: "easeOut" }}
//                             className="roo-clean-segment"
//                             style={{
//                               transformOrigin: "left",
//                               background:
//                                 n <= userPreference.lifestyle.cleanliness
//                                   ? `hsl(${142 - n * 4}, ${70 + n * 3}%, ${45 - n}%)`
//                                   : "var(--stone-200)",
//                             }}
//                           />
//                         ))}
//                       </div>
//                       <p
//                         style={{
//                           fontSize: 28,
//                           fontWeight: 800,
//                           color: "var(--green-700)",
//                           margin: 0,
//                           lineHeight: 1,
//                         }}
//                       >
//                         {userPreference.lifestyle.cleanliness}
//                         <span style={{ fontSize: 14, fontWeight: 500, color: "var(--green-500)" }}>
//                           /5
//                         </span>
//                       </p>
//                     </div>

//                     {/* Lifestyle habits */}
//                     <div className="roo-pref-card">
//                       <p
//                         style={{
//                           fontSize: 11,
//                           fontWeight: 600,
//                           color: "var(--stone-400)",
//                           textTransform: "uppercase",
//                           letterSpacing: "0.07em",
//                           margin: "0 0 14px",
//                         }}
//                       >
//                         Lifestyle Habits
//                       </p>
//                       <div className="roo-scroll-tags">
//                         {userPreference.lifestyle.smoking && (
//                           <span className="roo-tag lifestyle">
//                             <Cigarette size={12} /> Smoking
//                           </span>
//                         )}
//                         {userPreference.lifestyle.drinking && (
//                           <span className="roo-tag lifestyle">
//                             <Wine size={12} /> Drinking
//                           </span>
//                         )}
//                         {userPreference.lifestyle.pets && (
//                           <span className="roo-tag lifestyle">
//                             <PawPrint size={12} /> Pets
//                           </span>
//                         )}
//                         {!userPreference.lifestyle.smoking &&
//                           !userPreference.lifestyle.drinking &&
//                           !userPreference.lifestyle.pets && (
//                             <span
//                               style={{
//                                 fontSize: 13,
//                                 color: "var(--stone-400)",
//                                 fontStyle: "italic",
//                               }}
//                             >
//                               None selected
//                             </span>
//                           )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="empty"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   style={{
//                     background: "white",
//                     border: "1px solid var(--stone-200)",
//                     borderRadius: 20,
//                     padding: "60px 40px",
//                     textAlign: "center",
//                     minHeight: 340,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <motion.div
//                     animate={{
//                       y: [0, -8, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                     style={{
//                       width: 72,
//                       height: 72,
//                       borderRadius: 20,
//                       background: "var(--green-50)",
//                       border: "1px solid var(--green-200)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginBottom: 24,
//                       color: "var(--green-600)",
//                     }}
//                   >
//                     <LucideBadgeQuestionMark size={28} />
//                   </motion.div>
//                   <h2
//                     style={{
//                       fontSize: 22,
//                       fontWeight: 800,
//                       color: "var(--stone-800)",
//                       margin: "0 0 10px",
//                     }}
//                   >
//                     No Preferences Added
//                   </h2>
//                   <p
//                     style={{
//                       fontSize: 14,
//                       color: "var(--stone-400)",
//                       maxWidth: 300,
//                       lineHeight: 1.6,
//                       margin: 0,
//                     }}
//                   >
//                     This user hasn't set their lifestyle preferences yet. Check back soon!
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default page;

// /* ─────────────── SUB-COMPONENTS ─────────────── */

// function MetaChip({
//   icon,
//   children,
// }: {
//   icon: React.ReactNode;
//   children: React.ReactNode;
// }) {
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 5,
//         padding: "4px 10px",
//         borderRadius: 999,
//         fontSize: 12,
//         fontWeight: 500,
//         background: "#f5f5f4",
//         color: "#57534e",
//         border: "1px solid #e7e5e4",
//       }}
//     >
//       <span style={{ color: "#16a34a", display: "flex" }}>{icon}</span>
//       {children}
//     </span>
//   );
// }

// function InfoRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value?: string;
// }) {
//   return (
//     <div className="roo-info-row">
//       <div className="roo-info-icon">{icon}</div>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p
//           style={{
//             fontSize: 11,
//             fontWeight: 600,
//             color: "var(--stone-400)",
//             textTransform: "uppercase",
//             letterSpacing: "0.06em",
//             margin: "0 0 2px",
//           }}
//         >
//           {label}
//         </p>
//         <p
//           style={{
//             fontSize: 14,
//             fontWeight: 600,
//             color: "var(--stone-800)",
//             margin: 0,
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {value ?? "—"}
//         </p>
//       </div>
//     </div>
//   );
// }

// function ScoreRing({ score }: { score: number }) {
//   const radius = 36;
//   const circumference = 2 * Math.PI * radius;
//   const dashoffset = circumference - (score / 100) * circumference;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 8,
//       }}
//     >
//       <div style={{ position: "relative", width: 96, height: 96 }}>
//         <svg width={96} height={96} style={{ transform: "rotate(-90deg)" }}>
//           <circle
//             cx={48}
//             cy={48}
//             r={radius}
//             fill="none"
//             stroke="#f0fdf4"
//             strokeWidth={8}
//           />
//           <motion.circle
//             cx={48}
//             cy={48}
//             r={radius}
//             fill="none"
//             stroke="url(#scoreGrad)"
//             strokeWidth={8}
//             strokeLinecap="round"
//             strokeDasharray={circumference}
//             initial={{ strokeDashoffset: circumference }}
//             animate={{ strokeDashoffset: dashoffset }}
//             transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
//           />
//           <defs>
//             <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#4ade80" />
//               <stop offset="100%" stopColor="#16a34a" />
//             </linearGradient>
//           </defs>
//         </svg>
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             style={{
//               fontSize: 22,
//               fontWeight: 800,
//               color: "var(--green-700)",
//               lineHeight: 1,
//             }}
//           >
//             {score}
//           </motion.span>
//           <span style={{ fontSize: 10, color: "var(--stone-400)", fontWeight: 600 }}>%</span>
//         </div>
//       </div>
//     </div>
//   );
// }