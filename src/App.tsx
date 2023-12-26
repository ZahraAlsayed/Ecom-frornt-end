/* eslint-disable prettier/prettier */
import { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import IndexRouting from './routes/IndexRouting';
import { AppDispatch } from './redux/store'
import { fetchProducts } from './redux/slices/products/productSlice';
import { fechUsers } from './redux/slices/userslices/userSlice';
import { fechCategories } from './redux/slices/products/categorySlice';
import { fechOrdersForAdmin } from './redux/slices/userslices/orderSlice';


function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fechUsers())
    dispatch(fechCategories())
    dispatch(fechOrdersForAdmin())
  }
    , [])


  return (

    <IndexRouting />

  )
}

export default App
