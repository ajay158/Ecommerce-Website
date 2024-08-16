'use client';
import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar
            key={i}
            className="text-yellow-500"
          />
        ) : (
          <FaRegStar
            key={i}
            className="text-yellow-500"
          />
        )
      );
    }
    return stars;
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data = await fetch('https://dummyjson.com/products');
        data = await data.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;
    return matchesCategory;
  });

  const convertPriceToNPR = (price) => {
    const USD_TO_NPR_CONVERSION_RATE = 134.74;
    return price * USD_TO_NPR_CONVERSION_RATE;
  };

  return (
    <div className="container mx-auto p-6">
      {/* Filter Section */}
      <div className="mb-6">
        <label>
          Filter by Category:
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="ml-2 border p-2 rounded"
          >
            <option value="">All</option>
            <option value="fragrances">Fragrances</option>
            <option value="beauty">Beauty</option>
            <option value="groceries">Groceries</option>
          </select>
        </label>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow-lg"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-auto rounded-lg"
            />
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-sm text-gray-500 mt-1 flex">
              Rating: {renderStars(item.rating)}
            </p>
            <p className="text-gray-900 font-semibold mt-2">
              Rs. {convertPriceToNPR(item.price).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {item.stock > 0 ? `In Stock: ${item.stock}` : 'Out of Stock'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Category: {item.category}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Date Created:{' '}
              {new Date(item.dateCreated).toLocaleDateString('en-GB')}
            </p>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
              onClick={() => addToCart(item)}
              disabled={item.stock <= 0}
            >
              {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
