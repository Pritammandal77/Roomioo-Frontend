import { removeUserData } from "@/lib/rtk/features/userSlice";
import { useAppDispatch } from "@/lib/rtk/hooks";
import { logOutUser } from "@/services/auth.api";
import { LucideBadgeQuestionMark } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  setShowConfirmLogoutPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmLogOutModal({ setShowConfirmLogoutPopup }: Props) {

  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      const res = await logOutUser();
      toast.success("Logged out successfully");
      setShowConfirmLogoutPopup(false);
      dispatch(removeUserData())
    } catch (error) {
      toast.error("something went wrong while log out");
    }
  };

  return (
    <div
      className="w-screen h-screen absolute top-0 right-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs"
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      <div
        className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl"
        style={{ animation: "modalPop 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 text-red-500 rounded-full">
            <LucideBadgeQuestionMark size={20} />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">
            Confirm Logout
          </h1>
        </div>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to log out? You will need to log in again to
          access your account.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowConfirmLogoutPopup(false)}
            className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleLogOut}
            className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-md hover:shadow-lg"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLogOutModal;
