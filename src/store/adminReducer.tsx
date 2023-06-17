import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { log } from 'console';

interface ProductData {
  id?: string;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

interface ProductDetailState {
  loading: boolean;
  error: null | string | undefined;
}


export const postProduct = createAsyncThunk<void, ProductData>(
  'productDetail/postProduct',
  async (productData) =>
  {
    alert('Prodect created successfully.')
    const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  }
);

export const editProduct = createAsyncThunk<void, ProductData>(
  'productDetail/editProduct',
  async (productData) =>
  {    
    alert('Item has been edited successfully')    
    const { id } = productData;
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();    
    return data;
  }
);

export const deleteProduct = createAsyncThunk<void, number>(
  'productDetail/deleteProduct',
  async (id) =>
  {
    alert(`Product No.${id} is now deleted.`);
    
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
);


const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    loading: false,
    error: null,
  } as ProductDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Product posted successfully:', action.payload);
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.loading = false;
        // Handle successful edit if needed
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        // Handle successful delete if needed
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productDetailSlice.reducer;
