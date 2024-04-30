// DescriptionInputButton.js
import React, { useState } from 'react';

function DescriptionInputButton({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="input-button">
      <textarea
        placeholder="Enter description"
        value={value}
        onChange={handleChange}
      />
      <button className="add-button" onClick={() => onChange(value)}>Description</button>
    </div>
  );
}

export default DescriptionInputButton;
