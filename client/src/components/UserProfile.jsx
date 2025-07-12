import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* User Icon */}
      <button
        onClick={() => navigate("/profile")}
        className="text-gray-700 text-3xl"
      >
        <FaUserCircle />
      </button>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-20"
          >
            <ul className="text-sm text-gray-800">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                👤 Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                💖 Wishlist
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                ⚙️ Settings
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;



