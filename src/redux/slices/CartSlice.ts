import { createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "@/types/cart";

interface CartState {
  cart_items: CartItemType[];
  total_price: number;
}

const initialState: CartState = {
  cart_items: [],
  total_price: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart_items = action.payload.cart_items;
      state.total_price = action.payload.total_price;
    },
    removeCart: () => {
      return initialState;
    },
  },
});

export const { setCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
