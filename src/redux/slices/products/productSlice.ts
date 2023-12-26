/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import api from '../../../api'
import { Category } from './categorySlice'

export type Product = {
 _id: string
  title: string
  slug: string
  price: number
  image: string
  category: string
  categoryName: Category
  description: string
  quantity: number
  sold: number
  shipping: number
  createdAt: string
  updatedAt: string

}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchingTerm: string
  singleProduct: Product,
  addedProduct: null,
  categotyName:string,
    pagination: {
    totalProducts: number
    totalPage: number
    currentPage: number
  }

}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchingTerm: "",
  addedProduct: null,
  categotyName:'',
  singleProduct: {} as Product ,
    pagination: {
    totalProducts: 0,
    totalPage: 1,
    currentPage: 1
  }
}
export const fetchProducts = createAsyncThunk('items/fetchProducsts', async () => {
  const res = await api.get('/products');
  console.log(res.data)
    return res.data
    
});
export const fetchData = createAsyncThunk(
  'products/fetchData',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await api.get(`/products`, {
      params: {
        page,
        limit
      }
    })
    return response.data
  }
)
export const fetchProduct = createAsyncThunk('items/fetchProducst', async (slug:string | undefined) => {
  const res = await api.get(`/products/${slug}`);
  console.log(res.data)
  return res.data
    
});
export const deleteProduct = createAsyncThunk('items/deleteProduct',async(slug: string) => {
  await api.delete(`/products/${slug}`)
  return slug
})

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProductData: FormData) => {
    const res = await api.post(`/products`, newProductData)
    console.log(res)
    return res.data
  })

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data: { slug: string; formData: FormData }) => {
    const response = await api.put(`/products/${data.slug}`, data.formData)
    // return data
    return response.data
  }
)


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    // productsSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.items = action.payload.payload.products
    // },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    // removeProduct: (state, action: { payload: { productId: number } }) => {
    //   const filteredItems = state.items.filter((product) => product._id !== action.payload)
    //   state.items = filteredItems
    // },
    // updateProduct: (state, action:  PayloadAction<Product>) => {
    //    const index = state.items.findIndex((product) => product._id === action.payload._id);

    //   if (index !== -1) {
    //     state.items[index] = action.payload;
    //   }

    // },
    getSreachResult: (state, action) => {
      state.searchingTerm =action.payload;
    },
    // getCategoryName: (state, action) => {
    //   console.log(action.payload.payload.products)
    //   state.searchingTerm =action.payload;
    // },
    sortProducts:(state ,action)=>{
      const sortingInput =action.payload;
      if(sortingInput === 'name'){
        state.items.sort((a,b)=>a.title.localeCompare(b.title) )
      }
      else if(sortingInput === 'price'){
        state.items.sort((a,b)=>a.price -b.price )
      }
    },
    findProductBId: (state, action) => {
            const id=action.payload
            const productFound = state.items.find((product) => product._id == id)
            if (productFound) {
                state.singleProduct = productFound
            }
        },
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.payload.products
        console.log(action.payload.payload.pagination)
        //  const {totalPage , currentPage ,productTotal} =action.payload.payload.pagination
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleProduct = action.payload.payload
      })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.items = state.items.filter(product => product.slug !== action.payload)
      state.isLoading = false
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      const { totalPage, currentPage, totalProducts } = action.payload.payload.pagination
      state.pagination = {
        totalProducts: totalProducts,
        totalPage: totalPage,
        currentPage: currentPage
      }
      // state.pagination = action.payload.payload.pagination
      state.items = action.payload.payload.products
      state.isLoading = false
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.items.push(action.payload.payload)
      state.isLoading = false
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      console.log(action.payload.payload)
      const updatedProduct = action.payload.payload
      console.log(updatedProduct)
      state.items = state.items.map((product) => {
        if (product._id === updatedProduct._id) {
          return { ...product, ...updatedProduct }
        }
        return product
      })
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
export const { addProduct, productsRequest ,getSreachResult,
  sortProducts ,findProductBId} = productSlice.actions

export default productSlice.reducer
