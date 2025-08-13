import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createCartSlice } from './slices/cart-slice';
import type { CartSlice } from './slices/cart-slice';

type StoreState = {
  cart: CartSlice;
};

const useStore = create<StoreState>()(
  devtools((...a) => ({
    ...createCartSlice(...a),
  })),
);

export { useStore };
