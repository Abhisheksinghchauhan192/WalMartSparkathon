import { FiShoppingCart } from 'react-icons/fi';
import ProductCard from './components/productCard';
import products from './data/products';

function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">

      {/* Cart Button - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <button className="relative bg-white p-3 rounded-full shadow-md hover:shadow-lg transition">
          <FiShoppingCart className="text-2xl text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">WalmartSpartthon</h1>

      {/* Product Grid - No Gaps */}
      <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center">
        Electronic Items
      </h2>
     <div className="overflow-x-auto scrollbar-hide scroll-smooth max-w-full">
  <div className="flex space-x-3 px-2 py-4 pr-6 w-max">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>
    </div>
  );
}

export default App;
