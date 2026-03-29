"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPreference, upsertPreference } from "@/services/preference";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

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

  // ✅ safer state update
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectBtn = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ fetch existing preference
  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const res = await getPreference();
        const data = res.data;
        console.log(res);
        setIsEdit(true);

        setFormData({
          minBudget: String(data.budget.min), // fix (string)
          maxBudget: String(data.budget.max),
          occupation: data.occupation || "",
          personality: data.personality || "",
          smoking: data.lifestyle?.smoking || false,
          drinking: data.lifestyle?.drinking || false,
          sleepSchedule: data.lifestyle?.sleepSchedule || "",
          cleanliness: data.lifestyle?.cleanliness || 3,
          foodPreference: data.lifestyle?.foodPreference || "",
          pets: data.lifestyle?.pets || false,
          gender: data.gender || "",
          workStyle: data.workStyle || "",
        });
      } catch {
        setIsEdit(false); // no preference yet
      } finally {
        setLoading(false);
      }
    };

    fetchPreference();
  }, []);

  const validateForm = () => {
    if (!formData.minBudget || !formData.maxBudget) return "Budget required";
    if (!formData.occupation) return "Occupation required";
    if (!formData.personality) return "Personality required";
    if (!formData.sleepSchedule) return "Sleep schedule required";
    if (!formData.foodPreference) return "Food preference required";
    if (!formData.gender) return "Gender required";

    if (
      ["Working Professional", "Freelancer"].includes(formData.occupation) &&
      !formData.workStyle
    ) {
      return "Work style required";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    if (+formData.minBudget > +formData.maxBudget) {
      toast.error("Min budget cannot be greater than max budget");
      return;
    }

    const payload: any = {
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
    };

    // ✅ only add if valid
    if (["WFO", "WFH", "Hybrid"].includes(formData.workStyle)) {
      payload.workStyle = formData.workStyle;
    }

    try {
      await upsertPreference(payload);

      toast.success(
        isEdit
          ? "Preferences updated successfully ✅"
          : "Preferences saved successfully ✅",
      );

      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const pill = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all border ${
      active
        ? "bg-green-600 text-white border-green-600 shadow-md scale-105"
        : "bg-white text-gray-600 border-gray-300 hover:bg-green-100"
    }`;

  // ✅ loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading preferences...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex justify-center">
      <div className="w-full max-w-4xl mt-20 mb-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            {isEdit ? (
              <>
                Edit Your <span className="text-green-600">Preferences</span> ✏️
              </>
            ) : (
              <>
                Setup Your <span className="text-green-600">Preferences</span>{" "}
                🌿
              </>
            )}
          </h1>

          <p className="text-gray-500 mt-2 text-sm max-w-md leading-relaxed">
            Tell us about your lifestyle so we can match you with the perfect
            roommate and living space.
          </p>

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
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm transition"
              required
            />
            <input
              type="number"
              name="maxBudget"
              placeholder="Max Budget"
              value={formData.maxBudget}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm transition"
              required
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

          {/* Work Style conditional */}
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
                key={p}
                type="button"
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
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white shadow-sm transition"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold shadow-md">
            {isEdit ? "Update Preferences" : "Save Preferences"}
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
