import React from 'react';

function ConfirmationModal({ message, onConfirm, onCancel }) {
  const handleConfirm = () => {
    onConfirm(); // Invoke the onConfirm function passed from the parent component
  };

  const handleCancel = () => {
    onCancel(); // Invoke the onCancel function passed from the parent component
  };

  return (
    <div className="confirmation-modal">
      <p>{message}</p>
      <div className="confirmation-buttons">
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
