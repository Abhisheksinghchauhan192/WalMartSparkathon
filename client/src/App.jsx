import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { FiShoppingCart } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import CartDrawer from "./components/cartDrawer";
import ProductCard from "./components/productCard";
import CategoryTitle from "./components/categoryTitle";
import SearchBar from "./components/search";
import UserProfile from "./components/UserProfile";
import Wishlist from "./components/WishList";
import ProductDetail from "./components/productDetail";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFirstAddMsg, setShowFirstAddMsg] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [showWishlistPage, setShowWishlistPage] = useState(false);
  const [width, height] = useWindowSize();
  const [discountThreshold, setDiscountThreshold] = useState(20);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const grouped = filteredProducts.reduce((acc, product) => {
    const category = product.product_category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const addToCart = (product) => {
    const alreadyInCart = cart.find((item) => item._id === product._id);

    if (!alreadyInCart) {
      setShowConfetti(true);
      if (cart.length === 0) {
        setShowFirstAddMsg(true);
        setTimeout(() => setShowFirstAddMsg(false), 4000);
      }
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        toast.info("Increased quantity");
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Added to cart");
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setTimeout(() => setShowConfetti(false), 2000);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
    toast("Quantity updated");
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    toast.warn("Item removed");
  };

  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item._id === product._id)) {
      setWishlist((prev) => prev.filter((item) => item._id !== product._id));
      toast.info("Removed from wishlist");
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Added to wishlist");
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const MainPage = () => (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {showConfetti && <Confetti width={width} height={height} />}

      {showFirstAddMsg && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow-lg z-50">
          You have added your first product to cart
        </div>
      )}

      <div className="absolute top-4 left-4 z-10">
        <UserProfile
          onWishlistClick={() => setShowWishlistPage((prev) => !prev)}
        />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowDrawer(true)}
          className="relative bg-white p-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          <FiShoppingCart className="text-2xl text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        WalmartSparkathon
      </h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {showWishlistPage ? (
        <Wishlist
          wishlist={wishlist}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
        />
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-10">
            <CategoryTitle category={category} />
            <div className="flex overflow-x-auto gap-4 pb-2">
              {items.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.some((w) => w._id === product._id)}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {showDrawer && (
        <CartDrawer
          cart={cart}
          setShowDrawer={setShowDrawer}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );

  return (
    <>
      {/* ✅ ToastContainer here makes toasts work globally */}
      <ToastContainer position="top-right" autoClose={1500} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              discountThreshold={discountThreshold}
              setDiscountThreshold={setDiscountThreshold}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
