'use client';
import useCartStore from '@/app/store/cartstore';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Page = (props: any) => {
  const { slug } = props.params;
  const [product, setProduct] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const addToCart = useCartStore((state: any) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${slug}`);
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">...Loading</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row bg-white border p-6 rounded-lg shadow-lg">
        <div className="img-container lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-60 h-60 lg:w-80 lg:h-80 rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="txt-container lg:w-1/2 lg:pl-10">
          <h2 className="font-bold text-3xl text-gray-800">{product.title}</h2>
          <p className="text-gray-900 font-semibold text-xl mt-3">
            Rs. {convertPriceToNPR(product.price).toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            <p className="flex text-sm text-gray-500 mt-1">
              Rating: {renderStars(product.rating)}
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Category: {product.category}
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            {product.description}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className={`mt-6 w-full lg:w-auto bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-blue-700 ${
              product.stock <= 0 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          {showSuccessMessage && (
            <p className="mt-4 text-green-600 font-semibold">
              Added successfully to cart!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Function to convert price to NPR
export const convertPriceToNPR = (price: number) => {
  const USD_TO_NPR_CONVERSION_RATE = 134.74;
  return price * USD_TO_NPR_CONVERSION_RATE;
};

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

export default Page;
