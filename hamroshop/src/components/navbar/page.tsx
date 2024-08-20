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
        <div className="nav flex justify-around">
          <div className="logo logo text-2xl font-bold cursor-pointer">
            <h1>Hamro Shop</h1>
          </div>
          <div className="menu space-x-6">
            <Link
              href="/"
              className="hover:font-bold"
            >
              Home
            </Link>
            <Link
              className="hover:font-bold"
              href="/products"
            >
              Products
            </Link>
          </div>
          <div className="cart">
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
      </div>
    </>
  );
};

export default Navbar;
