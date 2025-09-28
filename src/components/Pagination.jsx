import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center sm:justify-end px-4 space-x-2 mt-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50"
      >
        <FiChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`w-8 h-8 flex items-center justify-center bg-white border rounded text-sm ${
            currentPage === i + 1
              ? "border-blue-500 text-blue-500"
              : "hover:bg-gray-100 border-gray-300 text-black"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
