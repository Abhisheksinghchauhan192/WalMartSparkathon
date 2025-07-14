import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiMaximize2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { cardHoverAnimation } from "../utils/animation";

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted }) => {
  return (
    <motion.div
      {...cardHoverAnimation}
      className="relative min-w-[200px] max-w-[200px] h-[320px] bg-white shadow rounded-lg p-3 flex flex-col justify-between group"
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
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-36 object-contain mb-3"
      />

      {/* Product Name */}
      <h3 className="text-sm font-semibold mb-1 line-clamp-2">{product.name}</h3>

      {/* Price + Wishlist Icon */}
      <div className="flex items-center justify-between mt-1">
        <p className="text-gray-700 font-medium">${product.price}</p>
        <button
          onClick={() => toggleWishlist(product)}
          className={`text-lg transition ${
            isWishlisted ? "text-pink-600" : "text-gray-500 hover:text-pink-600"
          }`}
          title="Add to Wishlist"
        >
          <FiHeart />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700 transition-opacity opacity-0 group-hover:opacity-100"
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;
