import { FiX } from "react-icons/fi";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  confirming = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
           {title}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-all"
            disabled={confirming}
            aria-label="Close"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="px-5 py-6 text-black font-semibold text-sm sm:text-base">
          {message}
        </div>

         <div className="flex justify-end space-x-3 px-4 py-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition text-sm"
            disabled={confirming}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded transition text-sm"
            disabled={confirming}
          >
            {confirming ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
