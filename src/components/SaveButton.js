// SaveButton.js
import React from 'react';

function SaveButton({ onClick }) {
  return (
    <button className="save-button" onClick={onClick}>
      Save Task
    </button>
  );
}

export default SaveButton;
