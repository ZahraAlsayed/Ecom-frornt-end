/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
    Typography,
    Paper,
    IconButton
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts, findProductBId, removeProduct } from '../redux/slices/products/productSlice';

import Footer from '../components/Footer'
import Header from './Header';
import { removeAllFromCart, removeFromCart } from '../redux/slices/products/cartSlice';



const Cart = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { cartItems } = useSelector((state: RootState) => state.cart)

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/");

    };
    const handelRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id))

    }
    const handelRemoveAllFromCart = (id: number) => {
        dispatch(removeAllFromCart)
    }
    const totalAmountOfCart = () => {
        let totalAmount = 0
        cartItems.length > 0 && cartItems.map((item) => totalAmount = totalAmount + item.prise)

        return totalAmount
    }

    console.log(cartItems)


    return (
        <div >
            <Header />
            <div className='contanter'>
                <Toolbar />
                <Typography variant="h4">My Cart </Typography>
                <h1 >{totalAmountOfCart()} </h1>
                <span onClick={handleNavigation} ><ArrowBackIcon /></span>
                <TableContainer component={Paper} >
                    <Table>
                        {cartItems.length > 0 && (
                            <TableBody>
                                {cartItems.map((item) =>
                                    <TableRow key={item.id}>
                                        <TableCell> {item.name} </TableCell>
                                        <TableCell>
                                            <img src={item.image} alt={item.name} width={200} />
                                        </TableCell>
                                        <TableCell>{item.prise} ASR</TableCell>
                                        <TableCell>
                                            <IconButton color="error" aria-label="delete" onClick={() =>
                                                handelRemoveFromCart(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                )
                                }

                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </div>
            <Footer />
        </div>
    )
}
export default Cart
