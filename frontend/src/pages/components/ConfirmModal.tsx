import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CompanyModal: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg mx-auto relative">
        <h2 className="text-xl font-outfit font-bold mb-4 pb-2">
          Are you sure you want to confirm the selections?
        </h2>
        {/* <p className="font-medium text-gray-500 mb-4 font-roboto tracking-wider text-base">
          You cannot change them later.
        </p> */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg text-black font-roboto"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-orange-600 px-4 py-2 rounded-lg text-white font-roboto"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
