import React, { useEffect } from "react";

interface RulesModalProps {
  show: boolean;
  onClose: () => void;
  rules: string[];
}

const RulesModal: React.FC<RulesModalProps> = ({ show, onClose, rules }) => {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // Handle click outside the modal to close it
  const handleClickOutside = (e: MouseEvent) => {
    if ((e.target as Element).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  // Handle Escape key press to close the modal
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 modal-overlay">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg mx-auto relative overflow-y-auto max-h-[80vh] mb-[10vh] mt-[20vh] custom-scrollbar">
        <h2 className="text-xl font-outfit font-semibold mb-4">Rules</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 ml-2 font-poppins">
          {rules.map((rule, index) => (
            <li key={index} className="mb-2">
              {rule}
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-orange-600 px-4 py-2 rounded-lg text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
