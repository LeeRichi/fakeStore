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
      console.log(product);

      const { id, quantity } = action.payload;
      console.log(quantity);
      
      
      const existingProduct = state.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    
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
