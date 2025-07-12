import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const ProductExpand = ({ product, onClose, addToCart }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <FiX size={20} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
        />

        {/* Product Info */}
        <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
        <p className="text-gray-700 mb-2">${product.price}</p>
        {product.product_category && (
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.product_category}
          </p>
        )}
        {product.description && (
          <p className="text-sm text-gray-600 mb-4">
            Description: {product.description}
          </p>
        )}

        {/* Add to Cart */}
        <button
          onClick={() => {
            addToCart(product);
            onClose();
          }}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProductExpand;
