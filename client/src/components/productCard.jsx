import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiMaximize2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { cardHoverAnimation } from "../utils/animation";

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted }) => {
  return (
    <motion.div
      {...cardHoverAnimation}
      className="relative min-w-[200px] max-w-[200px] bg-white shadow rounded-lg p-3 flex-shrink-0 group"
    >
      {/* Expand Button */}
      <Link
        to={`/product/${product._id}`}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10"
        title="View Details"
      >
        <FiMaximize2 className="text-gray-600 hover:text-blue-600 text-base" />
      </Link>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-contain mb-2"
      />

      <h3 className="text-sm font-semibold">{product.name}</h3>
      <p className="text-gray-500 text-sm">${product.price}</p>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute bottom-2 left-2 text-lg ${
          isWishlisted ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
        }`}
        title="Add to Wishlist"
      >
        <FiHeart />
      </button>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded 
                   hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition duration-300"
      >
        Add
      </button>
    </motion.div>
  );
};

export default ProductCard;
