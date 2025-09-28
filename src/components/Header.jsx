import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";

export default function Header({ userName = "Elon Musk" }) {
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      dispatch(logout());
      toast.success("Logged out successfully!");
    } finally {
      setLoggingOut(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <header className="bg-black text-white flex justify-end items-center px-5 py-3 gap-4">
        <span className="font-semibold text-[14px]">{userName}</span>
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-sm"
        >
          <FiLogOut size={16} />
        </button>
      </header>

      <ConfirmDialog
        open={confirmOpen}
        title="Logout"
        message="Do you really want to logout?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleLogout}
        confirming={loggingOut}
      />
    </>
  );
}
