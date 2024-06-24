import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchText)}`);
      setSearchText("");
      onClose(); // Close the modal after search
    }
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.className.includes("search-modal-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-4 md:mx-0">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Search</h2>
        <form onSubmit={handleSearch} className="flex flex-col">
          <input
            type="text"
            value={searchText}
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 transition duration-200"
            placeholder="Enter search term"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
