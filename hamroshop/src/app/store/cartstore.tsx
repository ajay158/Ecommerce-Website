'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      totalPrice: 0,
      totalItems: 0,
      addToCart: (product: any) =>
        set((state: { cart: any[]; totalItems: number; totalPrice: any }) => {
          const itemExists = state.cart.find((item) => item.id === product.id);
          if (itemExists) {
            const updatedCart = state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              cart: updatedCart,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + product.price,
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + product.price,
            };
          }
        }),
      increaseQuantity: (id: any) =>
        set((state: { cart: any[]; totalItems: number; totalPrice: any }) => {
          const updatedCart = state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          const product = state.cart.find((item) => item.id === id);
          return {
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          };
        }),
      decreaseQuantity: (id: any) =>
        set(
          (state: { cart: any[]; totalItems: number; totalPrice: number }) => {
            const product = state.cart.find((item) => item.id === id);
            if (product.quantity === 1) {
              const updatedCart = state.cart.filter((item) => item.id !== id);
              return {
                cart: updatedCart,
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - product.price,
              };
            } else {
              const updatedCart = state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              );
              return {
                cart: updatedCart,
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - product.price,
              };
            }
          }
        ),
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
