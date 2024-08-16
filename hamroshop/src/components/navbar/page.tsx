import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 z-10 bg-gray-100 p-5">
        <div className="flex justify-between items-center ">
          <div className="logo text-3xl font-bold">
            <h1>H𝔞Μгⓞ 𝓈𝔥ｏρ</h1>
          </div>
          <div className="cart text-3xl text-black">
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
