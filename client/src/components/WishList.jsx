
const Wishlist = ({ wishlist, addToCart, toggleWishlist }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💖 Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <button
                className="absolute top-2 right-2 text-red-500 text-xl"
                onClick={() => toggleWishlist(product)}
              >
                ❌
              </button>
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
