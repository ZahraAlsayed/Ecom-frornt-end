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
  return res.data
})
export const deleteUser = createAsyncThunk('items/deleteUser',async(id: string) => {
   await api.delete<User[]>(`/users/${id}`)
  return id
})
export const baneUser = createAsyncThunk('items/baneUser',async(id: string)=>{
  const res = await api.put<User[]>(`/users/ban/${id}`)
 return id
})
export const unbaneUser = createAsyncThunk('items/unbaneUser',async(id: string)=>{
  const res = await api.put<User[]>(`/users/unban/${id}`)
  return id
  
})

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
      },
        deleteUser: (state, action) => {
           state.items.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fechUsers.fulfilled, (state, action) => {
                state.isLoading = false
              state.error = null
              console.log(action.payload)
                state.items = action.payload.payload.users
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
              state.items = state.items.filter(user => user._id == action.payload)
              state.isLoading = false
              state.error = null
            })
            .addCase(baneUser.fulfilled, (state, action) => {
              const foundUser = state.items.find(user => user._id == action.payload)
              if (foundUser) {
                foundUser.isBanned=true
              }
              state.isLoading = false
              state.error = null
            })
          .addCase(unbaneUser.fulfilled, (state, action) => {
              const foundUser = state.items.find(user => user._id == action.payload)
              if (foundUser) {
                foundUser.isBanned= false
              }
              state.isLoading = false
              state.error = null
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
//export const { removeProduct, addProduct, productsRequest, productsSuccess , getSreachResult ,sortProducts} = userSlice.actions
export const { login  ,logout,addNewUser} = userSlice.actions

export default userSlice.reducer
