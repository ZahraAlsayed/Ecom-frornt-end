import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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
  singleProduct: Product
  addedProduct: null
  categotyName: string
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
  searchingTerm: '',
  addedProduct: null,
  categotyName: '',
  singleProduct: {} as Product,
  pagination: {
    totalProducts: 0,
    totalPage: 1,
    currentPage: 1
  }
}
export const fetchProducts = createAsyncThunk('items/fetchProducsts', async () => {
  try {
    const res = await api.get('/products')
    return res.data
  } catch (error) {
    throw new Error('Error fetching products')
  }
})
export const fetchData = createAsyncThunk(
  'products/fetchData',
  async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await api.get(`/products`, {
        params: {
          page,
          limit
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Error fetching products')
    }
  }
)
export const fetchFilterProducts = createAsyncThunk(
  'products/fetchFilterProducts',
  async ({
    page,
    limit,
    checkedCategory
  }: {
    page: number
    limit: number
    checkedCategory: string[]
  }) => {
    try {
      const response = await api.get(`/products/filter-products`, {
        params: {
          page,
          limit,
          checkedCategory
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Error fetching products')
    }
  }
)
export const fetchProduct = createAsyncThunk(
  'items/fetchProducts',
  async (slug: string | undefined) => {
    try {
      const res = await api.get(`/products/${slug}`)
      return res.data
    } catch (error) {
      throw new Error('Error fetching product')
    }
  }
)

export const deleteProduct = createAsyncThunk('items/deleteProduct', async (slug: string) => {
  try {
    await api.delete(`/products/${slug}`)
    return slug
  } catch (error) {
    throw new Error('Error deleteing product')
  }
})

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProductData: FormData) => {
    try {
      const res = await api.post(`/products`, newProductData)
      return res.data
    } catch (error) {
      throw new Error('Error creating product')
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data: { slug: string; formData: FormData }) => {
    try {
      const response = await api.put(`/products/${data.slug}`, data.formData)
      return response.data
    } catch (error) {
      throw new Error('Error updating product')
    }
  }
)

export const fetchBrainTreeToken = createAsyncThunk('products/fetchBrainTreeToken', async () => {
  try {
    const response = await api.get(`/products/braintree/token`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching BrainTree token')
  }
})

export const payWithBraintree = createAsyncThunk(
  'products/payWithBraintree',
  async (data: object) => {
    try {
      const response = await api.post(`/products/braintree/payment`, data)
      return response.data
    } catch (error) {
      throw new Error('Error processing Braintree payment')
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    getSreachResult: (state, action) => {
      state.searchingTerm = action.payload
    },
    sortProducts: (state, action) => {
      const sortingInput = action.payload
      if (sortingInput === 'name') {
        state.items.sort((a, b) => a.title.localeCompare(b.title))
      } else if (sortingInput === 'price') {
        state.items.sort((a, b) => a.price - b.price)
      }
    },
    findProductBId: (state, action) => {
      const id = action.payload
      const productFound = state.items.find((product) => product._id == id)
      if (productFound) {
        state.singleProduct = productFound
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.payload.products
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleProduct = action.payload.payload
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.slug !== action.payload)
        state.isLoading = false
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { totalPage, currentPage, totalProducts } = action.payload.payload.pagination
        state.pagination = {
          totalProducts: totalProducts,
          totalPage: totalPage,
          currentPage: currentPage
        }
        state.items = action.payload.payload.products
        state.isLoading = false
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        const { totalPage, currentPage, totalProducts } = action.payload.payload.pagination
        state.pagination = {
          totalProducts: totalProducts,
          totalPage: totalPage,
          currentPage: currentPage
        }
        state.items = action.payload.payload.products
        state.isLoading = false
      })
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload.payload)
        state.isLoading = false
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.payload
        state.items = state.items.map((product) => {
          if (product._id === updatedProduct._id) {
            return { ...product, ...updatedProduct }
          }
          return product
        })
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
export const { addProduct, productsRequest, getSreachResult, sortProducts, findProductBId } =
  productSlice.actions

export default productSlice.reducer
