'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useCartStore from '@/app/store/cartstore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  // const addToCart = useCartStore((state: any) => state.addToCart);

  const router = useRouter();

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
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

  const convertPriceToNPR = (price: number) => {
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
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-auto rounded-lg"
            />
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-gray-900 font-semibold mt-2">
              Rs. {convertPriceToNPR(item.price).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
