import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePasswordModal({ isOpen, onClose, onSave }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const inputClass =
    "w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-12 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400";

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    await onSave({
      oldPassword,
      newPassword,
    });

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-white text-center">
          Change Password
        </h2>

        <p className="text-slate-400 text-center mt-2 mb-8">
          Keep your account secure
        </p>

        {/* Old Password */}

        <div className="relative mb-5">

          <FaLock className="absolute left-4 top-4 text-cyan-400" />

          <input
            type={showOld ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={inputClass}
          />

          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-4 top-4 text-slate-400"
          >
            {showOld ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* New Password */}

        <div className="relative mb-5">

          <FaLock className="absolute left-4 top-4 text-cyan-400" />

          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />

          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-4 text-slate-400"
          >
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Confirm Password */}

        <div className="relative">

          <FaLock className="absolute left-4 top-4 text-cyan-400" />

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-4 text-slate-400"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition text-white font-semibold"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChangePasswordModal;