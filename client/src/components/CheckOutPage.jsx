import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function CheckoutPage({
  cart,
  wishlist,
  toggleWishlist,
  totalPrice,
  freeShippingThreshold,
  onApplyPromo,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [estimatedDeliveries, setEstimatedDeliveries] = useState({});

  useEffect(() => {
    const now = new Date();
    const estimates = {};

    cart.forEach((item) => {
      let daysToAdd = deliveryMethod === "express" ? 2 : 5;
      const estDate = new Date(now);
      estDate.setDate(estDate.getDate() + daysToAdd);
      estimates[item._id] = estDate.toDateString();
    });

    setEstimatedDeliveries(estimates);
  }, [cart, deliveryMethod]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error("Enter a promo code");
      return;
    }
    if (promoCode.toUpperCase() === "SAVE10") {
      const newDiscount = totalPrice * 0.1;
      setDiscount(newDiscount);
      toast.success("Promo code applied! 10% off");
      if (onApplyPromo) onApplyPromo(newDiscount);
    } else {
      toast.error("Invalid promo code");
      setDiscount(0);
    }
  };

  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);
  const handleDeliveryMethodChange = (e) => setDeliveryMethod(e.target.value);

  const finalPrice = (totalPrice - discount).toFixed(2);
  const qualifiesFreeShipping = totalPrice >= freeShippingThreshold;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-green-700">
        Checkout
      </h1>

      {/* Delivery Address */}
      <section className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-5 flex items-center gap-3">
          📦 Delivery Address
        </h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "name", placeholder: "Full Name" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "street", placeholder: "Street Address", colSpan: 3 },
            { name: "city", placeholder: "City" },
            { name: "state", placeholder: "State/Province" },
            { name: "zip", placeholder: "ZIP/Postal Code" },
            { name: "country", placeholder: "Country" },
          ].map(({ name, placeholder, colSpan }, idx) => (
            <input
              key={idx}
              type="text"
              name={name}
              placeholder={placeholder}
              value={deliveryAddress[name]}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none ${
                colSpan ? `sm:col-span-${colSpan} lg:col-span-${colSpan}` : ""
              }`}
            />
          ))}
        </form>
      </section>

      {/* Invoice Preview */}
      <section className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          🧾 Invoice Preview
        </h2>

        <div className="max-h-80 overflow-y-auto space-y-5">
          {cart.length === 0 && (
            <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
          )}

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b border-gray-200 pb-4"
            >
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover shadow"
              />
              <div className="flex-grow">
                <p className="font-semibold text-xl">{item.name}</p>
                <p className="text-gray-600 mt-1">Quantity: {item.quantity}</p>
                <p className="text-blue-600 mt-1 flex items-center gap-1 font-medium">
                  🚚 Estimated Delivery:{" "}
                  <span className="font-semibold">
                    {estimatedDeliveries[item._id] || "Loading..."}
                  </span>
                </p>
                <button
                  onClick={() => toggleWishlist(item)}
                  className={`mt-2 text-sm font-semibold ${
                    wishlist.find((w) => w._id === item._id)
                      ? "text-red-600 hover:text-red-700"
                      : "text-gray-500 hover:text-red-600"
                  } transition-colors`}
                >
                  {wishlist.find((w) => w._id === item._id)
                    ? "Remove from Wishlist ♥"
                    : "Add to Wishlist ♡"}
                </button>
              </div>
              <div className="font-bold text-xl whitespace-nowrap">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md p-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <button
            onClick={handleApplyPromo}
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Apply Promo
          </button>
        </div>

        {/* Pricing Summary */}
        <div className="mt-8 border-t border-gray-300 pt-6 max-w-md mx-auto text-right space-y-3 text-gray-700">
          <p className="text-lg">
            Subtotal: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </p>
          <p className="text-lg">
            Discount:{" "}
            <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
          </p>
          <p className="text-lg">
            Shipping:{" "}
            <span
              className={`font-semibold ${
                qualifiesFreeShipping ? "text-green-600" : ""
              }`}
            >
              {qualifiesFreeShipping ? "Free" : "$5.99"}
            </span>
          </p>
          <p className="text-3xl font-extrabold">
            Total: $
            {qualifiesFreeShipping
              ? finalPrice
              : (parseFloat(finalPrice) + 5.99).toFixed(2)}
          </p>
        </div>
      </section>

      {/* Delivery Method Selector */}
      <section className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          🚛 Delivery Method
        </h2>
        <div className="flex flex-col gap-4 text-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="deliveryMethod"
              value="standard"
              checked={deliveryMethod === "standard"}
              onChange={handleDeliveryMethodChange}
              className="w-5 h-5 accent-green-600"
            />
            <span>Standard (5 days, $5.99 shipping)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="deliveryMethod"
              value="express"
              checked={deliveryMethod === "express"}
              onChange={handleDeliveryMethodChange}
              className="w-5 h-5 accent-green-600"
            />
            <span>Express (2 days, $15.99 shipping)</span>
          </label>
        </div>
      </section>

      {/* Payment Method */}
      <section className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">🛡️ Payment Method</h2>
        <div className="flex flex-col gap-4 text-lg">
          {[
            { value: "credit_card", label: "Credit Card" },
            { value: "paypal", label: "PayPal" },
            { value: "cash_on_delivery", label: "Cash on Delivery" },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={value}
                checked={paymentMethod === value}
                onChange={handlePaymentChange}
                className="w-5 h-5 accent-green-600"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Place Order Button */}
      <div className="text-center mt-12">
        <button
          className="bg-green-700 text-white px-10 py-4 rounded-lg text-2xl font-extrabold hover:bg-green-800 transition-shadow shadow-md hover:shadow-lg"
          onClick={() => toast.success("Order placed!")}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
