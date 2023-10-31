/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type User = {
    id: number,
    firstName:string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

export type UserState = {
  items: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User |null
  
}

const initialState: UserState = {
  items: [],
  error: null,
  isLoading: false,
  isLoggedIn: false,
  userData:null

}
export const fechUsers = createAsyncThunk('items/fechUsers', async () => {
    const res = await api.get('/mock/e-commerce/users.json')
    return res.data
})
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.userData=action.payload
        },
        deleteUser:(state, action) =>{
            const filterUsre= state.items.filter((user) => user.id != action.payload)
            state.items= filterUsre
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fechUsers.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fechUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.items = action.payload
            })
            .addCase(fechUsers.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "There is something wrong "
            })
    }
})
//export const { removeProduct, addProduct, productsRequest, productsSuccess , getSreachResult ,sortProducts} = userSlice.actions
export const { login ,deleteUser} = userSlice.actions

export default userSlice.reducer
