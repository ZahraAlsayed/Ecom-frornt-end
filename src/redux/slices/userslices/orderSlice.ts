/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Order = {
    id: number,
    productId: number,
    userId: number,
    purchasedAt: string
}

export type OrderState = {
  items: Order[]
  error: null | string
  isLoading: boolean
  
}

const initialState: OrderState = {
  items: [],
  error: null,
  isLoading: false,

}
export const fechOrders = createAsyncThunk('items/fechOrders', async () => {
    const res = await api.get('/mock/e-commerce/orders.json')
    return res.data
})
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fechOrders.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fechOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.items = action.payload
            })
            .addCase(fechOrders.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "There is something wrong "
            })
    }
})
//export const { removeProduct, addProduct, productsRequest, productsSuccess , getSreachResult ,sortProducts} = userSlice.actions

export default orderSlice.reducer
