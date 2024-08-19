'use client';

import useCartStore from '@/app/store/cartstore';
import { convertPriceToNPR } from '../products/[slug]/page';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { cart, totalItems, totalPrice, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const router = useRouter();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4 text-gray-700">Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item: any) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center border-b pb-4"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-40 h-40 rounded-lg object-cover"
                />
                <div className="flex flex-col items-center md:items-start md:flex-1 md:ml-6 text-center md:text-left">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Category: {item.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.stock > 0
                      ? `In Stock: ${item.stock}`
                      : 'Out of Stock'}
                  </p>
                  <p className="mt-2 text-gray-900 font-semibold">
                    Rs. {convertPriceToNPR(item.price).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  <button
                    className="text-blue-500 p-2 hover:bg-blue-100 rounded"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    className="text-blue-500 p-2 hover:bg-blue-100 rounded"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-2">
            <p className="font-semibold text-lg">Total Items: {totalItems}</p>
            <p className="font-semibold text-lg">
              Total Price: Rs. {convertPriceToNPR(totalPrice).toLocaleString()}
            </p>
          </div>
          <button
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
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
