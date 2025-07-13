import React from "react";
import Confetti from "react-confetti";
import { FiShoppingCart } from "react-icons/fi";

import SearchBar from "./search";
import UserProfile from "./UserProfile";
import Wishlist from "./WishList";
import CategoryTitle from "./categoryTitle";
import ProductCard from "./productCard";
import CartDrawer from "./cartDrawer";

function MainPage({
  width,
  height,
  userName,
  cart,
  setShowDrawer,
  showDrawer,
  updateQuantity,
  removeItem,
  totalPrice,
  showConfetti,
  searchQuery,
  setSearchQuery,
  showWishlistPage,
  setShowWishlistPage,
  grouped,
  wishlist,
  toggleWishlist,
  addToCart,
  handleLogout,
  navigate,
}) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {showConfetti && <Confetti width={width} height={height} />}

      {/* Top Left: User Profile & Logout */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <UserProfile
          userName={userName}
          onWishlistClick={() => setShowWishlistPage((prev) => !prev)}
          onProfileClick={() => navigate("/profile")}
        />
        <button
          onClick={handleLogout}
          className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded shadow"
        >
          Logout
        </button>
      </div>

      {/* Top Right: Cart Icon */}
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

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome to Walmart Sparkathon Prototype
      </h1>

      {/* Search */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Wishlist or Products */}
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

      {/* Slide-In Cart Drawer */}
      {showDrawer && (
        <CartDrawer
          cart={cart}
          setShowDrawer={setShowDrawer}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          totalPrice={totalPrice}
          freeShippingThreshold={50}
          addToWishlist={toggleWishlist}
          navigate={navigate} // ✅ Added so Checkout button works
        />
      )}
    </div>
  );
}

export default MainPage;
