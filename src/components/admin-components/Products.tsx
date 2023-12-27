import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Paper,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { AppDispatch, RootState } from '../../redux/store'
import {
  deleteProduct,
  fetchProducts,
  productsRequest
} from '../../redux/slices/products/productSlice'

import '../../style/admin.css'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handelDelete = async (slug: string) => {
    try {
      dispatch(deleteProduct(slug))
      toast.success(`Product deleted sucssfuly `, {
        position: 'top-right',
        autoClose: 3000 // Duration in milliseconds
      })
    } catch (error) {
      toast.error('Somting Wrong ', {
        position: 'top-right',
        autoClose: 3000 // Duration in milliseconds
      })
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="table-container">
        <Toolbar />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Shipping </TableCell>
                <TableCell>Quantity </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.items.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>
                    <img src={product.image} alt={product.title} width={60} />
                  </TableCell>
                  <TableCell>{product.price} SAR</TableCell>
                  <TableCell>{product.shipping} </TableCell>
                  <TableCell>{product.quantity} </TableCell>

                  <TableCell>
                    <IconButton color="error" aria-label="delete">
                      <DeleteIcon
                        onClick={() => {
                          handelDelete(product.slug)
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
export default Products
