import React from "react";

const Button = ({ title, onClick }) => {
  return (
    <button
      id="button"
      onClick={onClick}
      className="bg-pink rounded-md h-8  w-24  text-black"
    >
      {title}
    </button>
  );
};

export default Button;
