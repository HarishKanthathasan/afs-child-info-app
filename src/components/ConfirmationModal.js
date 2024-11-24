import React from 'react';

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-center mb-4">Confirm Submission</h3>
        <p className="text-center mb-4">Are you sure you want to submit the form?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
