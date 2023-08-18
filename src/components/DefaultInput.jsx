import React from 'react';
import '../styles//DefaultInput.css'

const DefaultInput = ({ type, placeholder, value, required, onChange }) => {
  return (
    <div className='container'>
      <input
        className="inputField"
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default DefaultInput;