import React from "react";
import { FiX } from "react-icons/fi";

const CartDrawer = ({
  cart,
  setShowDrawer,
  updateQuantity,
  removeItem,
  totalPrice,
}) => {
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform duration-300">
      {/* Drawer Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={() => setShowDrawer(false)}>
          <FiX className="text-2xl" />
        </button>
      </div>

      {/* Cart Items List */}
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center mb-3"
          >
            <div>
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-gray-600">
                ${item.price} × {item.quantity}
              </p>
              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => updateQuantity(item._id, -1)}
                  className="bg-gray-200 px-2 text-sm rounded hover:bg-gray-300"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(item._id, 1)}
                  className="bg-gray-200 px-2 text-sm rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-2 text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-contain"
            />
          </div>
        ))
      )}

      {/* Total Price + Checkout */}
      {cart.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
          <button className="mt-2 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
