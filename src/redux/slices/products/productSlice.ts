/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

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
  searchingThrem: "",
  singleProduct: {} as Product 
}

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
    getSreachResult:(state ,action)=>{
      state.searchingThrem=action.payload;
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
    
    
  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess ,getSreachResult,
  sortProducts } = productSlice.actions

export default productSlice.reducer
