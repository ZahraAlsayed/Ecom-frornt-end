import { createSlice } from '@reduxjs/toolkit'
import 'react-toastify/dist/ReactToastify.css'

import { Product } from './productSlice'

const data =
  localStorage.getItem('cart') != null ? JSON.parse(String(localStorage.getItem('cart'))) : []

export type CartState = {
  cartItems: Product[]
}

const initialState: CartState = {
  cartItems: data
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeAllFromCart: (state, action) => {
      state.cartItems = []
      localStorage.removeItem('cart')
    }
  }
})

export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions
export default cartSlice.reducer
