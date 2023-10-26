/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
    id: number,
    name:string,

}

export type CategoryState = {
  items: Category[]
  error: null | string
  isLoading: boolean
  
}

const initialState: CategoryState = {
  items: [],
  error: null,
  isLoading: false,

}
export const fechCategories = createAsyncThunk('items/fechCategories', async () => {
    const res = await api.get('/mock/e-commerce/categories.json')
    return res.data
})
export const categorySlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fechCategories.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fechCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.items = action.payload
            })
            .addCase(fechCategories.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "There is something wrong "
            })
    }
})
//export const { removeProduct, addProduct, productsRequest, productsSuccess , getSreachResult ,sortProducts} = userSlice.actions

export default categorySlice.reducer
