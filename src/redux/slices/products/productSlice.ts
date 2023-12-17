/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import api from '../../../api'

export type Product = {
  _id: string
  title: string
  image: string
  description: string
  slug: string,
  quantity: number
  sold: number
  price: number
  category: string[]
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
export const fetchProducts = createAsyncThunk('items/fetchProducsts', async () => {
  const res = await api.get('/products');
  console.log(res.data)
    return res.data
    
});
export const deleteProduct = createAsyncThunk('items/deleteProduct',async(slug: string) => {
  await api.delete(`/products/${slug}`)
  return slug
})


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    // productsSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.items = action.payload.payload.products
    // },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    // removeProduct: (state, action: { payload: { productId: number } }) => {
    //   const filteredItems = state.items.filter((product) => product._id !== action.payload)
    //   state.items = filteredItems
    // },
    updateProduct: (state, action:  PayloadAction<Product>) => {
       const index = state.items.findIndex((product) => product._id === action.payload._id);

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
        state.items.sort((a,b)=>a.title.localeCompare(b.title) )
      }
      else if(sortingInput === 'prise'){
        state.items.sort((a,b)=>a.price -b.price )
      }
    },
    findProductBId: (state, action) => {
            const id=action.payload
            const productFound = state.items.find((product) => product._id == id)
            if (productFound) {
                state.singleProduct = productFound
            }
        },
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
        state.items = action.payload.payload.products
      })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.items = state.items.filter(product => product.slug == action.payload)
      state.isLoading = false
      })
      builder.addMatcher((action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
          state.error = null
        })
      builder.addMatcher((action) => action.type.endsWith('/rejected'),
        (state,action) => {
          state.isLoading = false
          state.error = action.error.message || "There is something wrong "
            })
  }
})
export const { addProduct, productsRequest ,getSreachResult,
  sortProducts ,findProductBId,updateProduct} = productSlice.actions

export default productSlice.reducer
