import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

api.defaults.withCredentials = true

export type User = {
  _id: string
  name: string
  email: string
  password: string
  address: string
  image: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
}
const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
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
  ban: false
}
export const fechUsers = createAsyncThunk('items/fechUsers', async () => {
  const res = await api.get('/users')
  return res.data
})

export const deleteUser = createAsyncThunk(
  'items/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete<User[]>(`/users/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(error.res.message)
    }
  }
)

export const baneUser = createAsyncThunk(
  'items/baneUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.put<User[]>(`/users/ban/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(error.res.message)
    }
  }
)

export const unbaneUser = createAsyncThunk(
  'items/unbaneUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.put<User[]>(`/users/unban/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(error.res.message)
    }
  }
)

export const login = createAsyncThunk('items/login', async (user: object, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', user)
    return res.data
  } catch (error: any) {
    return rejectWithValue(error.res.message)
  }
})

export const logout = createAsyncThunk('items/logout', async () => {
  try {
    const res = await api.post('/auth/logout')
    return res.data
  } catch (error: any) {
    throw new Error(`Failed to logout `)
  }
})
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      await api.put(`/users/${userData._id}`, userData)
      return userData
    } catch (error) {
      return rejectWithValue('Error updating user')
    }
  }
)

export const forgetPassword = createAsyncThunk(
  'users/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await api.post(`/users/forget-password`, { email })
      return res.data
    } catch (error) {
      return rejectWithValue('Error sending forget password request')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const res = await api.post(`/users/reset-password`, {
        password: data.password,
        token: data.token
      })
      return res.data
    } catch (error) {
      return rejectWithValue('Error resetting password')
    }
  }
)

export const roleUser = createAsyncThunk(
  'users/roleUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.put(`/users/role/${id}`)
      return id
    } catch (error) {
      return rejectWithValue('Error resetting Error updating user role:')
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fechUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.items = action.payload.payload.users
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((user) => user._id !== action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(baneUser.fulfilled, (state, action) => {
        const foundUser = state.items.find((user) => user._id == action.payload)
        if (foundUser) {
          foundUser.isBanned = true
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(unbaneUser.fulfilled, (state, action) => {
        const foundUser = state.items.find((user) => user._id == action.payload)
        if (foundUser) {
          foundUser.isBanned = false
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.userData) {
          state.userData.name = action.payload.name
          localStorage.setItem(
            'loginData',
            JSON.stringify({
              isLoggedIn: state.isLoggedIn,
              userData: state.userData
            })
          )
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.userData = action.payload.payload
        localStorage.setItem(
          'loginData',
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
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      })
      .addCase(roleUser.fulfilled, (state, action) => {
        const foundUser = state.items.find((user) => user._id === action.payload)
        if (foundUser?.email) {
          foundUser.isAdmin = true
        }
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

export default userSlice.reducer
