/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

api.defaults.withCredentials = true

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
  
}

const initialState: UserState = {
  items: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  ban: false,

}
export const fechUsers = createAsyncThunk('items/fechUsers', async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk('items/deleteUser', async (id: string , {rejectWithValue}) => {
  try {
    await api.delete<User[]>(`/users/${id}`);
    return id;
  } catch (error :any) {
   return rejectWithValue(error.response.message)
  }
});

export const baneUser = createAsyncThunk('items/baneUser', async (id: string ,{rejectWithValue}) => {
  try {
    await api.put<User[]>(`/users/ban/${id}`);
    return id;
  } catch (error :any) {
    return rejectWithValue(error.response.message)

  }
});

export const unbaneUser = createAsyncThunk('items/unbaneUser', async (id: string , {rejectWithValue}) => {
  try {
    await api.put<User[]>(`/users/unban/${id}`);
    return id;
  } catch (error :any) {
    return rejectWithValue(error.response.message)
  }
});
// export const registerNewUser =createAsyncThunk('items/registerNewUser',async (UserDeta: {}) => {
//   try {
//     const res = await api.post(`/users/process-register`, UserDeta)
//     console.log(UserDeta)
//     return res.data
//   } catch (error) {
//     throw new Error(`Failed to Rigster user}`)
//   }
// })

export const login = createAsyncThunk('items/login',async (user: {} , {rejectWithValue}) => {
  try {
    const res = await api.post('/auth/login', user)
    console.log(res.data)
    return res.data
  } catch (error :any) {
    return rejectWithValue(error.response.message)
  }
})

export const logout = createAsyncThunk('items/logout', async () => {
  try {
    const res = await api.post('/auth/logout');
    return res.data;
  } catch (error :any) {
     throw new Error(`Failed to fetch `)
  }
});


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
  extraReducers: (builder) => {
    builder
      .addCase(fechUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.items = action.payload.payload.users
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(user => user._id !== action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(baneUser.fulfilled, (state, action) => {
        const foundUser = state.items.find(user => user._id == action.payload)
        if (foundUser) {
          foundUser.isBanned = true
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(unbaneUser.fulfilled, (state, action) => {
        const foundUser = state.items.find(user => user._id == action.payload)
        if (foundUser) {
          foundUser.isBanned = false
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.userData = action.payload.payload
        console.log(state.userData)
      localStorage.setItem(
        'login',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
        state.userData = null
        localStorage.setItem(
          'login',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
          })
          
      
      builder.addMatcher((action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
          state.error = null
        })
      builder.addMatcher((action) => action.type.endsWith('/rejected'),
        (state,action) => {
          state.isLoading = false
          state.error = action.payload || "There is something wrong "
            })
    }
})

export default userSlice.reducer
