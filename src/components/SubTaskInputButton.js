// SubtaskInputButton.js
import React, { useState } from 'react';

function SubtaskInputButton({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAddSubtask = () => {
    onChange(value);
    setValue('');
  };

  return (
    
    <div className="input-button">
      <input
        type="text"
        placeholder="Enter subtask"
        value={value}
        onChange={handleChange}
      />
      <button className="add-button" onClick={handleAddSubtask}>Subtask</button>
    </div>
  );
}

export default SubtaskInputButton;
