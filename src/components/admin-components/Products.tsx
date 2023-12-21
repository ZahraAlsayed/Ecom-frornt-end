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
    Paper,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppDispatch, RootState } from '../../redux/store'
import {
    deleteProduct,
    fetchProducts,
    productsRequest,
    
    removeProduct,

} from '../../redux/slices/products/productSlice'

import api, { baseURL } from '../../api'

import '../../style/admin.css'
import { ToastContainer, toast } from 'react-toastify';




const Products = () => {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const products = state.products

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])
    /**
    * If you want to keep things simple you can follow this approach on updating
    * redux state when using async requests instead of using createAsyncThunk
    */
    // const handleGetProducts = async () => {
    //     // let's first turn the loader to true so we can have a better UX
    //     dispatch(productsRequest())

    //     // Fetching from the local files
    //     const res = await api.get('/products')
    //     // At this point we have the data so let's update the store
    //     console.log(res.data)
    //     dispatch(productsSuccess(res.data.payload.products))
    // }
    const handelDelete = async (slug: string) => {
        try {
            dispatch(deleteProduct(slug))
            toast.success(`Product deleted sucssfuly `, {
                position: "top-right",
                autoClose: 3000, // Duration in milliseconds
            });
        } catch (error) {
            toast.error('Somting Wrong ', {
                position: "top-right",
                autoClose: 3000, // Duration in milliseconds
            });
        }
    };

    return (
        <div >
            <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="table-container">
                <Toolbar />
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
                                <TableRow key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell><img src={`${baseURL}${product.image}`} alt={product.title} width={60} /></TableCell>
                                    <TableCell>
                                        <IconButton color="secondary" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" aria-label="delete"
                                            >
                                            <DeleteIcon onClick={() => {
                                                handelDelete(product.slug);
                                            }} />
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
