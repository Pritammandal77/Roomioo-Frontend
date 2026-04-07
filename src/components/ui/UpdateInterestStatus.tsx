"use client";

import React from "react";
import { motion } from "framer-motion";

type UpdateInterestStatusProps = {
  open: boolean;
  status: "accepted" | "rejected" | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function UpdateInterestStatus({
  open,
  status,
  loading,
  onClose,
  onConfirm,
}: UpdateInterestStatusProps) {
  if (!open || !status) return null;

  const isAccept = status === "accepted";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-50 bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 flex flex-col gap-5"
      >
        {/* ICON */}
        <div className="flex justify-center">
          <div
            className={`p-3 rounded-full ${
              isAccept
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isAccept ? "✔" : "✖"}
          </div>
        </div>

        {/* TEXT */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Action
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Are you sure you want to{" "}
            <span
              className={`font-medium ${
                isAccept ? "text-green-600" : "text-red-600"
              }`}
            >
              {isAccept ? "accept" : "reject"}
            </span>{" "}
            this request?
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => !loading && onClose()}
            className="flex-1 text-sm bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-sm text-white py-2 rounded-lg transition ${
              isAccept
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } disabled:opacity-50`}
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateInterestStatus;