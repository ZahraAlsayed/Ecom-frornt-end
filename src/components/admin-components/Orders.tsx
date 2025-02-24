import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'

import { AppDispatch, RootState } from '../../redux/store'
import { fechOrdersForAdmin } from '../../redux/slices/userslices/orderSlice'

import '../../style/admin.css'
import '../../style/table.css'

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, isLoading, error } = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    dispatch(fechOrdersForAdmin())
  }, [])

  return (
    <div className="">
      <div className="contant">
        <Toolbar />
        <Typography variant="h4">orders List</Typography>
        <TableContainer component={Paper}>
          <Table className="table-container">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Orders By</TableCell>
                <TableCell>Paymet </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <DoneIcon color="primary" fontSize="large" />
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
export default Orders
