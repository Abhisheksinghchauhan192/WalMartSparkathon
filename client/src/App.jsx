import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi"; // Shopping cart icon
import { motion } from "framer-motion"; // For smooth animations
import { useWindowSize } from '@react-hook/window-size'; // For responsive confetti
import Confetti from 'react-confetti'; // Celebratory animation

export default function App() {
  // Store fetched products
  const [products, setProducts] = useState([]);

  // Store cart items
  const [cart, setCart] = useState([]);

  // Flag for showing confetti
  const [showConfetti, setShowConfetti] = useState(false);

  // Get window size for confetti size
  const [width, height] = useWindowSize();

  // Fetch products from server on initial render
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products"); // Fetching from backend
        const data = await res.json();
        setProducts(data); // Save to state
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Group products by category
  const grouped = products.reduce((acc, product) => {
    const category = product.product_category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  // Function to add items to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        // If item exists, increase quantity
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add to cart and show confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Emoji map for different categories
  const categoryIcons = {
    Beverages: "🍹",
    Fashion: "👗",
    Electronics: "💻",
    Grocery: "🛒",
    Toys: "🧸",
    Books: "📚",
    Beauty: "💄",
    Sports: "🏀",
    Furniture: "🪑",
    Uncategorized: "🗂️"
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen relative">

      {/* Confetti celebration when an item is added to cart for the first time */}
      {showConfetti && <Confetti width={width} height={height} />}

      {/* Cart icon fixed at the top-left corner with cart quantity indicator */}
      <motion.div
        className="fixed top-4 right-4 z-20"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <button className="relative bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition">
          <FiShoppingCart className="text-2xl text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>
      </motion.div>

      {/* Application heading */}
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 drop-shadow-sm">
        WalmartSparathon
      </h1>

      {/* Loop through each product category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-12">

          {/* Category heading with optional icon */}
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-700">
            <span className="text-2xl">{categoryIcons[category] || "🛍️"}</span>
            {category}
          </h2>

          {/* Horizontally scrollable product container */}
          <div className="flex overflow-x-auto gap-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-2">

            {/* Individual product card */}
            {items.map((product) => (
              <motion.div
                key={product._id || product.id}
                className="min-w-[220px] max-w-[220px] bg-white shadow-md rounded-2xl p-4 flex-shrink-0 group relative transition transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                {/* Product image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover rounded-md mb-3"
                />

                {/* Product name */}
                <h3 className="text-sm font-semibold text-gray-800">
                  {product.name}
                </h3>

                {/* Product price */}
                <p className="text-gray-600 text-sm mb-6">${product.price}</p>

                {/* Add to Cart button appears on hover */}
                <motion.button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileTap={{ scale: 0.9 }}
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

}


