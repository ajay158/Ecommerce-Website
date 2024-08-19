'use client';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import useCartStore from '@/app/store/cartstore';

const Navbar = () => {
  const { totalItems } = useCartStore();
  return (
    <>
      <div className="sticky top-0 z-10 bg-gray-100 p-5">
        <div className="flex justify-between items-center ">
          <div className="logo text-3xl font-bold">
            <h1>H𝔞Μгⓞ 𝓈𝔥ｏρ</h1>
          </div>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">
            <div className="relative text-3xl text-black">
              <FaShoppingCart />
              {totalItems > 0 && (
                <div
                  className={`absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 text-red-500 ${
                    totalItems > 0 ? 'block' : 'hidden'
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  {totalItems}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
