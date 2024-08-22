'use client';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import useCartStore from '@/app/store/cartstore';

const Navbar = () => {
  const { totalItems } = useCartStore();
  return (
    <div className="sticky top-0 z-10 bg-gray-100 p-4">
      <div className="nav flex justify-between items-center max-w-7xl mx-auto">
        <div className="logo text-2xl font-bold cursor-pointer text-gray-800">
          <h1>Hamro Shop</h1>
        </div>
        <div className="menu space-x-8 hidden md:flex">
          <Link
            href="/"
            className="hover:text-blue-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-blue-600 transition duration-300"
          >
            Products
          </Link>
        </div>
        <div className="cart relative">
          <Link href="/cart">
            <FaShoppingCart className="text-3xl text-gray-800 hover:text-blue-600 transition duration-300" />
            {totalItems > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
