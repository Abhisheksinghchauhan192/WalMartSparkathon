import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Ainmation will trigger for furst time
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-md mx-auto mb-6"
    >
      {/* Search Icon (shown only if input is empty) */}
      {searchQuery === "" && (
        <motion.div
          key="icon"
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -5 }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        >
          <FiSearch className="text-lg" />
        </motion.div>
      )}

      {/* Clear Button (shown when there's text) */}
      <AnimatePresence>
        {searchQuery && (
          <motion.button
            key="clear"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            <FiX className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search products..."
        className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-sm"
      />
    </motion.div>
  );
};

export default SearchBar;


