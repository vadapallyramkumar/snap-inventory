import React from "react";

const Card = ({ title, value, subtitle }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-background-VERY_LIGHT">
            <h3 className="text-gray-600 text-sm">{title}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
    );
};

export default Card;
