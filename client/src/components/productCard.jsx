function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-blue-600 font-bold mt-2">{product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;