import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { Product } from '../products/productSlice'
import { User } from './userSlice'

export type Order = {
  _id: string
  products: Product
  payment: string
  user: User
}

export type OrderState = {
  items: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  items: [],
  error: null,
  isLoading: false
}
export const fechOrdersForAdmin = createAsyncThunk('items/fechOrdersForAdmin', async () => {
  try {
    const res = await api.get('/orders/all-orders')
    return res.data
  } catch (error) {
    throw new Error('Error fetching orders for admin:')
  }
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id: string) => {
  try {
    await api.delete(`/orders/${id}`)
    return id
  } catch (error) {
    throw new Error('Error deleting order:')
  }
})
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.items = action.payload.payload.orders
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((order) => order._id !== action.payload)
        state.isLoading = false
      })
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.isLoading = false
        state.error = action.payload.error || 'There is something wrong '
      }
    )
  }
})

export default orderSlice.reducer
