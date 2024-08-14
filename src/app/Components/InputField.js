import React from 'react';

const InputField = ({ label, type, name }) => {
  return (
    <div className="mb-4 bg-bg">
      <label className="block text-sm ml-12 text-white text-left bg-bg font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-4/5 px-4 py-2  bg-input rounded focus:outline-none focus:ring-2 focus:ring-pink"
      />
    </div>
  );
};

export default InputField;
