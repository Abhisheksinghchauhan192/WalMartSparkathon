import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Intro from "./components/intro";
import ProductDetail from "./components/productDetail";
import UserDetailPage from "./components/UserDetailPage";
import MainPage from "./components/MainPage";
import CartPage from "./components/cartPage";
import CheckoutPage from "./components/CheckOutPage";


function App() {
  const FREE_SHIPPING_THRESHOLD = 50;

  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWishlistPage, setShowWishlistPage] = useState(false);
  const [discountThreshold, setDiscountThreshold] = useState(20);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();

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

  const handleUserContinue = (name) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userName");
      setUserName(null);
      setCart([]);
      setWishlist([]);
      setSavedItems([]);
    }
  };

  if (!userName) return <Intro onContinue={handleUserContinue} />;

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

  const addToCart = async (product) => {
    const payload = {
      userID: userName,
      productID: product._id,
      quantity: 1,
    };

    try {
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Added to cart");
        setCart((prevCart) => {
          const existing = prevCart.find((item) => item._id === product._id);
          if (existing) {
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else {
        toast.error(data.message || "Error adding to cart");
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Network or server error");
    }
  };

  const updateQuantity = async (productID, delta) => {
    const endpoint = delta === 1 ? "increase" : "decrease";

    try {
      const response = await axios.put(`http://localhost:3000/cart/${endpoint}`, {
        userID: userName,
        productID,
      });

      if (response.status === 200) {
        setCart(response.data.cart);
        toast.success("Quantity updated");
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Could not update quantity");
    }
  };

  const removeItem = async (productID) => {
    try {
      await axios.delete("http://localhost:3000/cart/remove", {
        data: { userID: userName, productID },
      });

      setCart((prev) => prev.filter((item) => item._id !== productID));
      toast.warn("Item removed from cart");
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item");
    }
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

  const saveForLater = (item) => {
    removeItem(item._id);
    setSavedItems((prev) => [...prev, item]);
  };

  const moveToCart = (item) => {
    setSavedItems((prev) => prev.filter((i) => i._id !== item._id));
    addToCart(item);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
  <Route
    path="/"
    element={
      <MainPage
        width={width}
        height={height}
        userName={userName}
        cart={cart}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        showConfetti={showConfetti}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showWishlistPage={showWishlistPage}
        setShowWishlistPage={setShowWishlistPage}
        grouped={grouped}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        totalPrice={totalPrice}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    }
  />
  
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

  <Route
    path="/cart"
    element={
      <CartPage
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        saveForLater={saveForLater}
        savedItems={savedItems}
        moveToCart={moveToCart}
        totalPrice={totalPrice}
        freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
      />
    }
  />

  <Route
    path="/checkout"
    element={
      <CheckoutPage
        cart={cart}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        totalPrice={totalPrice}
        freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
      />
    }
  />

  <Route
    path="/profile"
    element={<UserDetailPage userName={userName} />}
  />
</Routes>




    </>
  );
}

export default App;
