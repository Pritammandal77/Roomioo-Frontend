"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addPreference } from "@/services/preference";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    minBudget: "",
    maxBudget: "",
    occupation: "",
    personality: "",
    smoking: false,
    drinking: false,
    sleepSchedule: "",
    cleanliness: 3,
    foodPreference: "",
    pets: false,
    gender: "",
    workStyle: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const selectBtn = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (+formData.minBudget > +formData.maxBudget) {
      alert("Min budget cannot be greater than max budget");
      return;
    }

    const payload = {
      minBudget: Number(formData.minBudget),
      maxBudget: Number(formData.maxBudget),
      occupation: formData.occupation,
      personality: formData.personality,
      smoking: formData.smoking,
      drinking: formData.drinking,
      sleepSchedule: formData.sleepSchedule,
      cleanliness: Number(formData.cleanliness),
      foodPreference: formData.foodPreference,
      pets: formData.pets,
      gender: formData.gender,
      workStyle: formData.workStyle,
    };

    try {
      const res = await addPreference(payload);
      console.log(res);
      toast.success("Preference added successfully");
      router.push("/profile");
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  const pill = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all border ${
      active
        ? "bg-green-600 text-white border-green-600 shadow-md"
        : "bg-white text-gray-600 border-gray-300 hover:bg-green-100"
    }`;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex justify-center">
      <div className="w-full max-w-4xl mt-20 mb-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold ">
            Setup Your <span className="text-green-600">Preferences</span> 🌿
          </h1>

          <p className="text-gray-500 mt-2 text-sm max-w-md leading-relaxed">
            Tell us about your lifestyle so we can match you with the perfect
            roommate and living space.
          </p>

          {/* subtle divider */}
          <div className="mt-4 h-1 w-20 bg-green-500 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="minBudget"
              placeholder="Min Budget"
              value={formData.minBudget}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 
focus:ring-2 focus:ring-green-500 focus:outline-none 
bg-white shadow-sm transition"
            />
            <input
              type="number"
              name="maxBudget"
              placeholder="Max Budget"
              value={formData.maxBudget}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 
focus:ring-2 focus:ring-green-500 focus:outline-none 
bg-white shadow-sm transition"
            />
          </div>

          {/* Occupation */}
          <Section title="Occupation">
            {["Student", "Working Professional", "Freelancer", "Other"].map(
              (o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => selectBtn("occupation", o)}
                  className={pill(formData.occupation === o)}
                >
                  {o}
                </button>
              ),
            )}
          </Section>

          {["Working Professional", "Freelancer"].includes(
            formData.occupation,
          ) && (
            <Section title="Work Style">
              {["WFO", "WFH", "Hybrid"].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => selectBtn("workStyle", w)}
                  className={pill(formData.workStyle === w)}
                >
                  {w}
                </button>
              ))}
            </Section>
          )}

          {/* Personality */}
          <Section title="Personality">
            {["introvert", "extrovert", "ambivert"].map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => selectBtn("personality", p)}
                className={pill(formData.personality === p)}
              >
                {p}
              </button>
            ))}
          </Section>

          {/* Lifestyle */}
          <Section title="Lifestyle">
            {["smoking", "drinking", "pets"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl cursor-pointer hover:bg-green-50 transition"
              >
                <input
                  type="checkbox"
                  name={item}
                  checked={(formData as any)[item]}
                  onChange={handleChange}
                  className="accent-green-600"
                />
                <span className="capitalize text-gray-700">{item}</span>
              </label>
            ))}
          </Section>

          {/* Sleep */}
          <Section title="Sleep Schedule">
            {["early", "late"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => selectBtn("sleepSchedule", s)}
                className={pill(formData.sleepSchedule === s)}
              >
                {s}
              </button>
            ))}
          </Section>

          {/* Cleanliness */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Cleanliness</span>
              <span className="font-semibold text-green-600">
                {formData.cleanliness}/5
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              name="cleanliness"
              value={formData.cleanliness}
              onChange={handleChange}
              className="w-full accent-green-600"
            />
          </div>

          {/* Food */}
          <Section title="Food Preference">
            {["veg", "non-veg"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => selectBtn("foodPreference", f)}
                className={pill(formData.foodPreference === f)}
              >
                {f}
              </button>
            ))}
          </Section>

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 
focus:ring-2 focus:ring-green-500 focus:outline-none 
bg-white shadow-sm transition"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          {/* Work Style */}
          <Section title="Work Style">
            {["WFO", "WFH", "Hybrid"].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => selectBtn("workStyle", w)}
                className={pill(formData.workStyle === w)}
              >
                {w}
              </button>
            ))}
          </Section>

          <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold shadow-md">
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-3">{title}</p>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

/* Tailwind utility (add globally if needed)
.input {
  @apply w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm;
}
*/
