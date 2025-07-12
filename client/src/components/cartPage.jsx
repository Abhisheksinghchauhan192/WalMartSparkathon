import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({
  cart,
  updateQuantity,
  removeItem,
  saveForLater,
  savedItems,
  moveToCart,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [shippingCost, setShippingCost] = useState(5);
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle promo code
  const handlePromoApply = () => {
    if (promoCode === "SAVE10") {
      setDiscount(0.1 * subtotal);
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  // Handle shipping method
  useEffect(() => {
    if (shippingMethod === "standard") setShippingCost(5);
    else if (shippingMethod === "express") setShippingCost(15);
    else setShippingCost(0);
  }, [shippingMethod]);

  const grandTotal = subtotal - discount + shippingCost;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price} × {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="ml-4 text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => saveForLater(item)}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      Save for later
                    </button>
                  </div>
                </div>
              </div>
              <p className="font-medium text-gray-700">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Saved for Later */}
      {savedItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Saved for Later</h3>
          <div className="space-y-4">
            {savedItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />
                  <p>{item.name}</p>
                </div>
                <button
                  onClick={() => moveToCart(item)}
                  className="text-green-600 text-sm hover:underline"
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promo Code & Shipping */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Promo Code</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handlePromoApply}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Shipping Method</h3>
          <select
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="standard">Standard - $5</option>
            <option value="express">Express - $15</option>
            <option value="pickup">Store Pickup - Free</option>
          </select>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

