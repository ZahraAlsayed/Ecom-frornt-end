/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
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

import DeleteIcon from '@mui/icons-material/Delete';

import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts, findProductBId, removeProduct } from '../redux/slices/products/productSlice';

import Footer from '../components/Footer'
import Header from './Header';



const Cart = () => {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {  singleProduct } = useSelector((state: RootState) => state.products)
    //const product = state.products
    //const category = state.categories


    useEffect(() => {
        dispatch(fetchProducts()).then(() =>
            dispatch(findProductBId(id))
        )
    })



    return (
        <div >
            <Header />
            <div className='contanter'>
                <Toolbar />
                <Typography variant="h4">My Cart </Typography>
                <TableContainer component={Paper} >
                    <Table>


                        <TableBody>
                            <TableRow key={singleProduct.id}>
                                <TableCell> {singleProduct.name}</TableCell>
                                <TableCell>
                                    <img src={singleProduct.image} alt={singleProduct.name} width={200} />
                                </TableCell>
                                <TableCell>{singleProduct.prise} ASR</TableCell>

                                <TableCell>
                                    <IconButton color="error" aria-label="delete" onClick={() => dispatch(removeProduct({ productId: singleProduct.id }))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Footer />
        </div>
    )
}
export default Cart
