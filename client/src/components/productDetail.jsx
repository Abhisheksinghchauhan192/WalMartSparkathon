import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ProductDetail({
  products,
  addToCart,
  toggleWishlist,
  wishlist,
  discountThreshold,
  setDiscountThreshold,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [localThreshold, setLocalThreshold] = useState(discountThreshold);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) setProduct(foundProduct);
  }, [id, products]);

  const handleSetThreshold = () => {
    if (localThreshold < 1 || localThreshold > 100) {
      toast.error("Threshold must be between 1 and 100.");
      return;
    }
    setDiscountThreshold(localThreshold);
    toast.success("You’ll be notified when this product reaches the discount.");
  };

  const handleSubmitReview = () => {
    if (rating < 1 || reviewText.trim() === "") {
      toast.error("Please provide a star rating and a review.");
      return;
    }
    const newReview = { rating, text: reviewText.trim() };
    setReviews((prev) => [...prev, newReview]);
    setRating(0);
    setReviewText("");
    toast.success("Review submitted!");
  };

  if (!product) {
    return <div className="p-6">Loading product details...</div>;
  }

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  return (
    <motion.div
      className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        onClick={() => navigate("/")}
        className="mb-6 inline-block bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full object-cover rounded mb-4"
        />
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-green-600">${product.price}</p>
          <button
            onClick={() => toggleWishlist(product)}
            className={`px-4 py-2 rounded ${
              isWishlisted ? "bg-red-500" : "bg-yellow-400"
            } text-white hover:opacity-90`}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Set Discount Notification
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Enter a discount percentage. You’ll be notified when this product hits that discount.
          </p>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              max={100}
              value={localThreshold}
              onChange={(e) => setLocalThreshold(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSetThreshold}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Set Threshold
            </button>
          </div>
        </div>

        {/* Review Section */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Your Rating:</label>
            <div className="flex gap-1 text-yellow-400 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={rating >= star ? "text-yellow-400" : "text-gray-300"}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Your Review:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your thoughts about this product..."
            />
          </div>

          <button
            onClick={handleSubmitReview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Submit Review
          </button>

          {reviews.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Reviews:</h4>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="border-t pt-3">
                    <div className="flex items-center gap-2 text-yellow-400 text-sm">
                      {"★".repeat(r.rating)}
                      <span className="text-gray-500 ml-2 text-xs">({r.rating} stars)</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;
