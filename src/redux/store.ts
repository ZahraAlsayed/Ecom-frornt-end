import { configureStore } from '@reduxjs/toolkit'

import productSlice from './slices/products/productSlice'
import categorySlice from './slices/products/categorySlice'
import singleProductSlice from './slices/products/singleProductSlice'
import userSlice from './slices/userslices/userSlice'
import orderSlice from './slices/userslices/orderSlice'

export const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
    categories: categorySlice,
    product: singleProductSlice,
    orders: orderSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
