/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
    id: number,
    name: string,


}

export type CategoryState = {
  items: Category[]
  error: null | string
    isLoading: boolean
   searchTerm:string
  
  
}

const initialState: CategoryState = {
  items: [],
  error: null,
  isLoading: false,
  searchTerm:''

}
export const fechCategories = createAsyncThunk('items/fechCategories', async () => {
    const res = await api.get('/mock/e-commerce/categories.json')
    return res.data
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        sreachByCategoryName:(state, action) =>{
            state.searchTerm =action.payload
        },
        deleteCategory:(state, action) =>{
            const filterCategory = state.items.filter((category) => category.id != action.payload)
            state.items= filterCategory
        }
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
export const { deleteCategory ,sreachByCategoryName} = categorySlice.actions

export default categorySlice.reducer
