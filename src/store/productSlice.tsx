import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      const categories = await response.json();
      return categories;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  }
);

interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface FetchProductsByJoinParams {
  categoryId: string;
  minPrice: number;
  maxPrice: number;
  searchProps: string;
}

export const fetchProductsByJoin = createAsyncThunk<ProductData[], FetchProductsByJoinParams>(
  'products/fetchProductsByJoin',
  async ({ categoryId, minPrice, maxPrice, searchProps }, { rejectWithValue }) => {
    try {
      console.log(searchProps);
      const url = `https://api.escuelajs.co/api/v1/products/?price_min=${minPrice}&price_max=${maxPrice}&title=${searchProps}&categoryId=${categoryId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [] as ProductData[],
    loading: false,
    error: null as string | null,
    categories: [] as string[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByJoin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByJoin.fulfilled, (state, action: PayloadAction<ProductData[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByJoin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const sortProductsByPriceLowest = createSlice({
  name: "products/sortByPriceLowest",
  initialState: {},
  reducers: {
    sortByPriceLowest: (state, action: PayloadAction<ProductData[]>) => {
      return {
        ...state,
        products: action.payload.sort((a, b) => a.price - b.price),
      };
    },
  },
});

export const sortProductsByPriceHighest = createSlice({
  name: "products/sortByPriceHighest",
  initialState: {},
  reducers: {
    sortByPriceHighest: (state, action: PayloadAction<ProductData[]>) => {
      return {
        ...state,
        products: action.payload.sort((a, b) => b.price - a.price),
      };
    },
  },
});

export const sortProductsByName = createSlice({
  name: "products/sortByName",
  initialState: {},
  reducers: {
    sortByName: (state, action: PayloadAction<ProductData[]>) => {
      return {
        ...state,
        products: action.payload.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      };
    },
  },
});

export default productSlice.reducer;
