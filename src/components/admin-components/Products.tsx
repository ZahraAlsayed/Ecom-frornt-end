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
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppDispatch, RootState } from '../../redux/store'
import {
    productsRequest,
    productsSuccess,
    removeProduct,
   
} from '../../redux/slices/products/productSlice'

import api from '../../api'

import '../../style/admin.css'



const Products = () => {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const products = state.products

    useEffect(() => {
        handleGetProducts()
    }, [])

    /**
    * If you want to keep things simple you can follow this approach on updating
    * redux state when using async requests instead of using createAsyncThunk
    */
    const handleGetProducts = async () => {
        // let's first turn the loader to true so we can have a better UX
        dispatch(productsRequest())

        // Fetching from the local files
        const res = await api.get('/mock/e-commerce/products.json')
        // At this point we have the data so let's update the store
        dispatch(productsSuccess(res.data))
    }

    return (
        <div className="">
            <div className='contant'>
                <Toolbar />
                <Typography variant="h4">Products List</Typography>
                <Typography variant="h5">add Products  <IconButton color="primary" aria-label="add">
                    <AddIcon />
                </IconButton></Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.items.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell><img src={product.image} alt={product.name} width={60} /></TableCell>
                                    <TableCell>
                                        <IconButton color="secondary" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" aria-label="delete">
                                            <DeleteIcon onClick={() => dispatch(removeProduct({ productId: product.id }))} />
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
