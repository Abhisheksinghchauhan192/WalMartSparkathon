
import React from "react";
import { motion } from "framer-motion";
import { cardHoverAnimation } from "../utils/animation";

const ProductCard = ({ product, addToCart }) => {
  return (
    <motion.div
      {...cardHoverAnimation}
      key={product._id}
      className="min-w-[200px] max-w-[200px] bg-white shadow rounded-lg p-3 flex-shrink-0 group relative"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-contain mb-2"
      />
      <h3 className="text-sm font-semibold">{product.name}</h3>
      <p className="text-gray-500 text-sm">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded 
                   hover:bg-blue-700 opacity-0 translate-y-1 group-hover:opacity-100 
                   group-hover:translate-y-0 transition duration-300 ease-in-out"
      >
        Add
      </button>
    </motion.div>
  );
};

export default ProductCard;
