/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
    _id: string,
    name: string,
    slug:string
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
    const res = await api.get('/categories')
    console.log(res.data)

    return res.data
})
export const deletecaregoy = createAsyncThunk('items/deletecaregoy', async (id: string , {rejectWithValue}) => {
  try {
    await api.delete(`/categories/${id}`);
    return id
  } catch (error :any) {
   return rejectWithValue(error.response.message)
  }
});

export const createCategory =createAsyncThunk('items/createCategory',async (name: string) => {
  try {
    const res = await api.post(`/categories`, {name :name}  )
    console.log(res)
    return res.data
  } catch (error) {
    throw new Error(`Failed to create category}`)
  }
})
export const updateCategory =createAsyncThunk('items/updateCategory',async (category :  Partial<Category> ) => {
  try {
    const res = await api.put(`/categories/${category._id}`, {name :category.name}  )
     return category
  } catch (error) {
    throw new Error(`Failed to update category}`)
  }
})


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // addCategort: (state, action) => {
        //     state.items.push(action.payload)
        // },
        // sreachByCategoryName:(state, action) =>{
        //     state.searchTerm =action.payload
        // },
        // deleteCategory:(state, action) =>{
        //     const filterCategory = state.items.filter((category) => category.id != action.payload)
        //     state.items= filterCategory
        // },
        // updateCategory: (state, action) => {
        //     const { id, name } = action.payload
        //     const foundCategory = state.items.find((category) => category.id == id)
        //     if (foundCategory) {
        //         foundCategory.name=name
        //     }

        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fechCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.items = action.payload.payload
            })
         
        .addCase(deletecaregoy.fulfilled, (state, action) => {
            state.items = state.items.filter(Category => Category._id !== action.payload)
            state.isLoading = false
            state.error = null
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            console.log(action.payload)
            state.items.push(action.payload.payload)
            state.isLoading = false
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            const { _id, name } = action.payload
            const foundCategory = state.items.find((category) => category._id === _id)
            if (foundCategory && name) {
            foundCategory.name = name
      }
      state.isLoading = false
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
// export const {addCategort ,deleteCategory ,sreachByCategoryName,updateCategory} = categorySlice.actions

export default categorySlice.reducer
