'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import useCartStore from '@/app/store/cartstore';

// Define validation schema with yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  billingAddress: yup.string().required('Billing address is required'),
  deliveryAddress: yup.string().required('Delivery address is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone number is required'),
  currentDate: yup.date().required('Date is required').nullable(),
});

// Define form input type
interface IFormInput {
  name: string;
  billingAddress: string;
  deliveryAddress: string;
  phone: string;
  currentDate: Date | null;
}

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setSubmitted(true);

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => router.push('/')}
        >
          Go Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Checkout Form</h2>

      {submitted ? (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          Form was submitted successfully! Redirecting to homepage...
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Billing Address</label>
            <input
              type="text"
              {...register('billingAddress')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.billingAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.billingAddress.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Delivery Address</label>
            <input
              type="text"
              {...register('deliveryAddress')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.deliveryAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryAddress.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              {...register('phone')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Current Date</label>
            <input
              type="date"
              {...register('currentDate')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.currentDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentDate?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
