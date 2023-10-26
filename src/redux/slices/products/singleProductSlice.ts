/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchingThrem: string
  singleProduct: Product 
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchingThrem: " ",
  singleProduct: { } as Product
}

export const fetchSingleProduct = createAsyncThunk('items/fetchSingleProduct', async () => {
    const res = await api.get('/mock/e-commerce/products.json');
    return res.data;
    
});


export const singleProductSlice = createSlice({
  name: 'product',
  initialState,
    reducers: {
        findProductBId: (state, action) => {
            const id=action.payload
            const productFound = state.items.find((product) => product.id == id)
            if (productFound) {
                state.singleProduct = productFound
            }
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
        .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
       
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "There is something wrong";
      })
  }
})

export const { findProductBId } = singleProductSlice.actions
export default singleProductSlice.reducer
