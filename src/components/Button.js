import React from "react";

const Button = ({ children, onClick, className, variant }) => (
    <button
        onClick={onClick}
        variant={variant}
        className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow-md hover:bg-blue-700 transition ${className}`}
    >
        {children}
    </button>
);

export default Button;