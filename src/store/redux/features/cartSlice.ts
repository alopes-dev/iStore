import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  image: string;
  price: number;
  priceFormatted: string;
  name: string;
}

export interface CartState extends IProduct {
  amount: number;
}

const initialState = [] as CartState[];

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const currentProductIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );

      if (currentProductIndex < 0) {
        state = [...state, { ...action.payload, amount: 1 }];
        return state;
      }

      state[currentProductIndex].amount += 1;
      localStorage.setItem("iStore:cart", JSON.stringify(state));
    },
    addToAllCart: (state, action: PayloadAction<CartState[]>) => {
      state = action.payload;
      return state;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const newCart = state.filter((item) => item.id !== action.payload);

      state = newCart;
      localStorage.setItem("iStore:cart", JSON.stringify(state));
      return state;
    },
    updateAmount: (
      state,
      action: PayloadAction<{ amount: number; id: number }>
    ) => {
      if (action.payload.amount === 0) {
        return state;
      }

      const newCart = state.map((product) => {
        if (product.id === action.payload.id)
          product.amount = action.payload.amount;

        return product;
      });

      state = newCart;
      localStorage.setItem("iStore:cart", JSON.stringify(newCart));
    },
    loadFromLocalStorage: (state) => {
      state;
    },
  },
});

export const {
  addToCart,
  updateAmount,
  loadFromLocalStorage,
  removeFromCart,
  addToAllCart,
  reset,
} = cart.actions;
export default cart.reducer;
