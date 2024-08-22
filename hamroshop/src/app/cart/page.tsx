'use client';

import useCartStore from '@/app/store/cartstore';
import { convertPriceToNPR } from '../products/[slug]/page';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { cart, totalItems, totalPrice, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const router = useRouter();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4 text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-8">
            {cart.map((item: any) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center border-b pb-6"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col md:flex-row items-center md:items-start md:flex-1 md:ml-8 text-center md:text-left">
                  <div className="flex flex-col md:items-start items-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Category: {item.category}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.stock > 0
                        ? `In Stock: ${item.stock}`
                        : 'Out of Stock'}
                    </p>
                    <p className="mt-3 text-gray-900 font-semibold text-lg">
                      Rs. {convertPriceToNPR(item.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-6 md:mt-0 md:ml-auto">
                    <button
                      className="text-blue-600 p-2 hover:bg-blue-100 rounded-full transition duration-200"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      className="text-blue-600 p-2 hover:bg-blue-100 rounded-full transition duration-200"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 p-6 bg-gray-100 rounded-lg">
            <p className="font-semibold text-xl text-gray-800">
              Total Items: {totalItems}
            </p>
            <p className="font-semibold text-xl text-gray-800 mt-2">
              Total Price: Rs. {convertPriceToNPR(totalPrice).toLocaleString()}
            </p>
          </div>
          <button
            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-blue-700 disabled:bg-gray-400"
            disabled={cart.length === 0}
            onClick={() => router.push('/checkout')}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
