/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import api from '../../../api'

export type User = {
  _id: string,
  name:string,
  email: string,
  password: string,
  address: string,
  image: string,
  phone:string,
  isAdmin: boolean,
  isBanned: boolean,
  
    
}
const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('login')))
    : []
export type UserState = {
  items: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  ban: boolean
  isAdmin:boolean
  
}

const initialState: UserState = {
  items: [],
  error: null,
  isLoading: false,
  isLoggedIn: false,
  userData: null,
  ban: false,
  isAdmin:false

}
export const fechUsers = createAsyncThunk('items/fechUsers', async () => {
  const res = await api.get('/users')
  return res.data.payload.users
})

export const registerNewUser =async (UserDeta: FormData) => {
  const res = await api.post(`/users/process-register`,UserDeta)
  return res.data
}

export const deleteUser =async (id: string) => {
  const res = await api.delete(`/users/${id}`)
  return res.data
}
export const baneUser =async (id: string) => {
  const res = await api.put(`/users/ban/${id}`)
  return res.data
}
export const unbaneUser =async (id: string) => {
  const res = await api.put(`/users/unban/${id}`)
  return res.data
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload

      localStorage.setItem(
        'login',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
        },
        logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'login',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
        addNewUser: (state, action) => {
           state.items.push(action.payload)
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
export const { login  ,logout,addNewUser} = userSlice.actions

export default userSlice.reducer
