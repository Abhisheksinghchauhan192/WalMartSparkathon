import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) setProduct(foundProduct);
  }, [id, products]);

  const handleSetThreshold = () => {
    setDiscountThreshold(localThreshold);
    toast.success("You will be notified when the item reaches this discount.");
  };

  if (!product) {
    return <div className="p-6">Loading product details...</div>;
  }

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
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
            Enter a discount percentage. You'll be notified when this product reaches that discount.
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={100}
              value={localThreshold}
              onChange={(e) => setLocalThreshold(Number(e.target.value))}
              className="border p-2 rounded w-24"
            />
            <button
              onClick={handleSetThreshold}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Set Threshold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
