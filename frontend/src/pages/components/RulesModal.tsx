import React from "react";

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

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg mx-auto relative overflow-y-auto max-h-[80vh] mb-[10vh] mt-[20vh] custom-scrollbar">
        <h2 className="text-xl font-semibold mb-4">Rules</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 ml-2">
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
