/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  prise : number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
   searchingTerm: string
  singleProduct: Product 

}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
   searchingTerm: "",
  singleProduct: {} as Product 
}
export const fetchProducts = createAsyncThunk('items/fetchProducst', async () => {
    const res = await api.get('/mock/e-commerce/products.json');
    return res.data;
    
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    },
    updateProduct: (state, action:  PayloadAction<Product>) => {
       const index = state.items.findIndex((product) => product.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }

    },
    getSreachResult:(state ,action)=>{
      state. searchingTerm =action.payload;
    },
    sortProducts:(state ,action)=>{
      const sortingInput =action.payload;
      if(sortingInput === 'name'){
        state.items.sort((a,b)=>a.name.localeCompare(b.name) )
      }
      else if(sortingInput === 'id'){
        state.items.sort((a,b)=>a.id -b.id )
      }
    },
    findProductBId: (state, action) => {
            const id=action.payload
            const productFound = state.items.find((product) => product.id == id)
            if (productFound) {
                state.singleProduct = productFound
            }
        },
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch Products.'
      })
  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess ,getSreachResult,
  sortProducts ,findProductBId,updateProduct} = productSlice.actions

export default productSlice.reducer
