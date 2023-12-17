// /* eslint-disable prettier/prettier */
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Toolbar,
//     Paper,
//     IconButton
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// import { AppDispatch, RootState } from '../../redux/store'
// import {
//     Product,
//     productsRequest,
    

// } from '../../redux/slices/products/productSlice'

// import api from '../../api'


// import { ProductForm } from './ProductForm'

// import '../../style/admin.css'

// const initialProductState: Product = {
//     id: "",
//     name: '',
//     image: '',
//     description: '',
//     categories: [],
//     variants: [],
//     sizes: [],
//     price: 0
// }

// const UpdatingProducts = () => {
//     const dispatch = useDispatch<AppDispatch>()
//     const state = useSelector((state: RootState) => state)
//     const products = state.products
//     const [product, setProduct] = useState<Product>(initialProductState)
//     const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//     useEffect(() => {
//         handleGetProducts()
//     }, [])

//     const handleGetProducts = async () => {
//         dispatch(productsRequest())
//         const res = await api.get('/mock/e-commerce/products.json')
//         // dispatch(productsSuccess(res.data))
//     }


//     return (
//         <div className="">
//             <div>

//                 <div>
//                     <ProductForm />
//                 </div>
//             </div>

//             <div className='contant'>
//                 <Toolbar />
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Image</TableCell>
//                                 <TableCell>Description</TableCell>
//                                 <TableCell>Categorise</TableCell>
//                                 <TableCell>Variants</TableCell>
//                                 <TableCell>Size</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {products.items.map((product) => (
//                                 // <TableRow key={product.id}>
//                                 //     <TableCell>{product.id}</TableCell>
//                                 //     <TableCell>{product.name}</TableCell>
//                                 //     <TableCell>{product.image}</TableCell>
//                                 //     <TableCell>{product.description}</TableCell>
//                                 //     <TableCell>{product.categories}</TableCell>
//                                 //     <TableCell>{product.variants}</TableCell>
//                                 //     <TableCell>{product.sizes}</TableCell>
//                                     <TableCell>
//                                         <IconButton
//                                             color="secondary"
//                                             aria-label="edit"
//                                             onClick={() => setEditingProduct(product)}
//                                         >
//                                             <EditIcon />
//                                         </IconButton>

//                                         <IconButton color="error" aria-label="delete">
//                                             <DeleteIcon 
//                                             onClick={() => dispatch(removeProduct({ productId: product.id }))} />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>
//         </div>

//     )
// }
// export default UpdatingProducts
