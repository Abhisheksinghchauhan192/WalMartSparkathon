export default function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex flex-col items-center text-center w-fit m-1">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-contain mb-2"
      />
      <h2 className="text-sm font-semibold text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.price}</p>
    </div>
  );
}
