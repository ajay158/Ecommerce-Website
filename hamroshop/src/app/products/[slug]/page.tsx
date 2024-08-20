'use client';
import useCartStore from '@/app/store/cartstore';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Page = (props: any) => {
  const { slug } = props.params;
  const [product, setProduct] = useState(null);
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className=" flex border p-4 rounded-lg shadow-lg">
        <div className="img-container w-1/2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-60 h-60 mx-auto rounded-lg object-cover"
          />
        </div>
        <div className="txt-container w-1/2">
          <h2 className="font-bold text-2xl mt-4">{product.title}</h2>
          <p className="text-gray-900 font-semibold mt-2">
            Rs. {convertPriceToNPR(product.price).toLocaleString()}
          </p>
          <p className=" flex text-sm text-gray-500 mt-1">
            Rating: {renderStars(product.rating)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Category: {product.category}
          </p>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
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
