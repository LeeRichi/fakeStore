import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  quantity: number;
  images: string[];
  price: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    // removeFromCart: (state, action: PayloadAction<number>) => {
    //   const productId = action.payload;
    //   const index = state.findIndex((item) => item.id === productId);
    //   if (index !== -1) {
    //     const product = state[index];
    //     if (product.quantity > 1) {
    //       product.quantity -= 1;
    //     } else {
    //       state.splice(index, 1);
    //     }
    //   }
    // },
    // removeFromCart: (state: CartItem[], action: PayloadAction<number>) => {
    //   const productId = action.payload;
    //   const index = state.findIndex((item) => item.id === productId);
    //   if (index !== -1) {
    //     const product = state[index];
    //     if (product.quantity > 1) {
    //       product.quantity -= 1;
    //     } else {
    //       state.splice(index, 1);
    //     }
    //   }
    // }
    // removeFromCart: (state, action: PayloadAction<number>) => {
    //   const itemId = action.payload;
    //   const index = state.findIndex((item) => item.id === itemId);
    //   if (index !== -1) {
    //     state.splice(index, 1);
    //   }
    // },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const confirmed = window.confirm('Do you want to delete the item?');
      if (confirmed) {
        return state.filter((item) => item.id !== itemId);
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.find((item) => item.id === itemId);
      if (itemToUpdate) {
        if (newQuantity >= 1) {
          itemToUpdate.quantity = newQuantity;
        } else {
          const confirmed = window.confirm('Do you want to delete the item?');
          if (confirmed) {
            return state.filter((item) => item.id !== itemId);
          }
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
