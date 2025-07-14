import React from "react";
import { FiX } from "react-icons/fi";

const CartDrawer = ({
  cart,
  setShowDrawer,
  updateQuantity,
  removeItem,
  totalPrice,
  addToWishlist,
  freeShippingThreshold = 50,
  navigate,
}) => {
  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto transition-transform duration-300 space-y-6">
      {/* Drawer Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={() => setShowDrawer(false)}>
          <FiX className="text-2xl" />
        </button>
      </div>

      {/* Cart Items List */}
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex items-start gap-4 border-b pb-4 mb-4"
          >
            <img
              src={item.imgUrl}
              alt={item.name}
              className="w-16 h-16 object-contain flex-shrink-0"
            />
            <div className="flex-grow">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-gray-600 mb-2">
                ${item.price} × {item.quantity}
              </p>

              <div className="flex gap-2 items-center mb-1">
                <button
                  onClick={() => updateQuantity(item._id, -1)}
                  className="bg-gray-200 px-2 text-sm rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-sm px-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, 1)}
                  className="bg-gray-200 px-2 text-sm rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => addToWishlist(item)}
                  className="text-blue-500 text-xs hover:underline"
                >
                  Save for Later
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Total + Checkout */}
      {cart.length > 0 && (
        <div className="mt-6 space-y-3 border-t pt-4">
          <p className="font-semibold text-lg">
            Total: ${totalPrice.toFixed(2)}
          </p>

          {totalPrice >= freeShippingThreshold ? (
            <p className="text-sm text-green-600">
              🎉 You’re eligible for free shipping!
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Spend ${Math.ceil(freeShippingThreshold - totalPrice)} more for
              free shipping.
            </p>
          )}

          <button
            onClick={() => {
              setShowDrawer(false);
              navigate("/checkout");
            }}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
