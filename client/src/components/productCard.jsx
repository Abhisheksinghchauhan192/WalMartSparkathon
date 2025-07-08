export default function ProductCard({ product, addToCart }) {
  return (
    <div
  key={product._id || product.id}
  className="flex flex-col justify-between bg-white shadow rounded-lg p-4 min-w-[220px] max-w-[220px] h-[340px] flex-shrink-0"
>
  <img
    src={product.image}
    alt={product.name}
    className="h-32 w-full object-contain mb-2"
  />

  <h3 className="text-sm font-semibold leading-tight mb-1 line-clamp-2">{product.name}</h3>
  <p className="text-gray-700 text-sm mb-2">${product.price.toFixed(2)}</p>

  <div className="mt-auto">
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 rounded"
    >
      Add to Cart
    </button>
  </div>
</div>


  );
}
