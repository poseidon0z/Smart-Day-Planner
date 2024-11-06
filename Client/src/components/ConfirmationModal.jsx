import React from 'react';

const ConfirmationModal = ({ onClose, onConfirm, title, children }) => {
  return (
    <div className="fixed h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="max-w-md bg-white p-6 rounded-lg shadow-xl shadow-gray-500">
        <h1 className="w-full text-center text-2xl font-semibold mb-3">
          {title}
        </h1>
        {children}
        <div className="flex mt-4 max-w-md px-4 gap-2">
          <button
            onClick={onClose}
            className="flex-grow border-2 border-red-400 rounded-lg px-2 py-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-grow bg-green-500 text-white rounded-lg px-2 py-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
