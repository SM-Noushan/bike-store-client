import { TCart } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TCart[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => [
      ...state,
      { ...action.payload, itemQuantity: 1 },
    ],
    updateCart: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload.id);
      if (index !== -1) {
        switch (action.payload.type) {
          case "increase":
            state[index].itemQuantity += 1;
            break;
          case "decrease":
            state[index].itemQuantity -= 1;
            break;
          default:
            break;
        }
      }
    },
    removeCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
    resetCart: () => initialState,
  },
  selectors: {
    selectMyCart: (myCart) => myCart,
  },
});

export const { selectMyCart } = cartSlice.selectors;

export const { addToCart, updateCart, removeCart, resetCart } =
  cartSlice.actions;
