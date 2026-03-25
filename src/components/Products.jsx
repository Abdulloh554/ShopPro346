import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3002/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Xatolik:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500 font-semibold">Loading...</p>;

  return (
    <div className="p-6 rounded-lg bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-2xl shadow-neumorphism p-4 flex flex-col transition-transform hover:scale-105"
          >
            {/* Product image */}
            <div
              className="h-48 bg-cover bg-center rounded-xl mb-4 shadow-inner-neu"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            {/* Title and price */}
            <div className="flex-1">
              <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>
              <p className="text-gray-500 mt-1">${item.price}</p>
            </div>
            {/* Neumorphism button */}
            <button className="mt-4 py-2 rounded-lg bg-gray-100 shadow-inner-neu text-gray-700 font-semibold hover:shadow-neu hover:bg-gray-50 transition-all">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Tailwind Neumorphism shadows */}
      <style jsx>{`
        .shadow-neumorphism {
          box-shadow: 8px 8px 15px #d1d9e6, -8px -8px 15px #ffffff;
        }
        .shadow-inner-neu {
          box-shadow: inset 6px 6px 10px #d1d9e6, inset -6px -6px 10px #ffffff;
        }
      `}</style>
    </div>
  );
}

export default Products;