/* eslint-disable prettier/prettier */
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
    Paper,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import { AppDispatch, RootState } from '../../redux/store'
import { fechOrders } from '../../redux/slices/userslices/orderSlice';

import '../../style/admin.css'
import '../../style/table.css'

const Orders = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items, isLoading, error } = useSelector((state: RootState) => state.orders)
    //const orders = state.orders

    useEffect(() => {
        dispatch(fechOrders())
    }
        , [])
    console.log(items)

    if (isLoading) {
        return <p>loding ...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div className="">

            <div className='contant'>
                <Toolbar />
                <Typography variant="h4">orders List</Typography>
                <TableContainer component={Paper}>
                    <Table className="table-container">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Product ID</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.productId}</TableCell>
                                    <TableCell>{order.userId}</TableCell>
                                    <TableCell>{order.purchasedAt}</TableCell>
                                    <TableCell><DoneIcon color="primary" fontSize="large" /></TableCell>
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
