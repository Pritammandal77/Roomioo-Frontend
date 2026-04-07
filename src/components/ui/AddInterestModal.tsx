"use client";
import React from "react";

interface AddInterestModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  submitting: boolean;
}

function AddInterestModal({
  show,
  onClose,
  message,
  setMessage,
  onSubmit,
  submitting,
}: AddInterestModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl animate-in fade-in zoom-in-95">

        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Send Interest
        </h2>

        <textarea
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          placeholder="Write a message..."
          className="w-full h-28 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            {submitting ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInterestModal;