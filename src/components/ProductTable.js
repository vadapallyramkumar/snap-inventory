import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => (
    <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Price</th>
                <th className="px-4 py-2 text-left text-gray-600">Stock</th>
                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (
                <tr
                    key={product.id}
                    className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                >
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-4 py-2 text-center">
                        <button
                            onClick={() => onEdit(product)}
                            className="text-blue-500 hover:underline mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(product.id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ProductTable;
