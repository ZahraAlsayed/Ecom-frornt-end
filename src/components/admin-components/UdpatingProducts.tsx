/* eslint-disable prettier/prettier */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
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
    Product,
    createProduct,
    fetchProducts,
    productsRequest,
    updateProduct,
    

} from '../../redux/slices/products/productSlice'

import api from '../../api'


import { ProductForm } from './ProductForm'

import '../../style/admin.css'
import { toast } from 'react-toastify';



const UpdatingProducts = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items, isLoading, error } = useSelector((state: RootState) => state.products)
    const [productEdit, setProductEdit] = useState(false)
    const [productId, setProductId] = useState('')
    const [product, setProduct] = useState({
        title: '',
        slug: '',
        image: '',
        description: '',
        category: '',
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0
    })
    //const [editForm, setEditForm] = useState(false)
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (event.target.type === 'file') {
            const fileInput = (event.target as HTMLInputElement) || ''
            setProduct((prevProduct) => {
                return { ...prevProduct, [event.target.name]: fileInput.files?.[0] }
            })
        } else {
            setProduct((prevProduct) => {
                return { ...prevProduct, [event.target.name]: event.target.value }
            })
        }
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!productEdit) {
            const formData = new FormData()
            formData.append('title', product.title)
            formData.append('price', product.price.toString())
            formData.append('image', product.image)
            formData.append('category', product.category.toString())
            formData.append('description', product.description)
            formData.append('quantity', product.quantity.toString())
            formData.append('sold', product.sold.toString())
            formData.append('shipping', product.shipping.toString())

            dispatch(createProduct(formData))
            toast.success('Successful Add Product')
            setProduct({
                title: '',
                slug: '',
                image: '',
                description: '',
                category: '',
                quantity: 0,
                sold: 0,
                shipping: 0,
                price: 0
            })
        } else {
            const updateProducts = {
                _id: productId,
                title: product.title,
                slug: product.slug,
                image: product.image,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                sold: product.sold,
                shipping: product.shipping,
                price: product.price
            }
            dispatch(updateProduct(updateProducts))
            toast.success('Successful Update Product')
            setProduct({
                title: '',
                slug: '',
                image: '',
                description: '',
                category: '',
                quantity: 0,
                sold: 0,
                shipping: 0,
                price: 0
            })
        }


    }
    const handleEdit = (
        _id: string,
        slug: string,
        title: string,
        image: string,
        description: string,
        category: string,
        quantity: number,
        sold: number,
        shipping: number,
        price: number
    ) => {
        setProductId(_id)
        setProductEdit(!productEdit)
        if (!productEdit) {
            setProduct({
                title,
                slug,
                image,
                description,
                category,
                quantity,
                sold,
                shipping,
                price
            })
        } else {
            setProduct({
                title: '',
                slug: slug,
                image: '',
                description: '',
                category: '',
                quantity: 0,
                sold: 0,
                shipping: 0,
                price: 0
            })
        }
    }


    return (
            <div>

                <div>
                    <div >

                        <form onSubmit={handleSubmit} >
                            <div className="txtfield">
                                <label htmlFor="title"  >
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={product.title}
                                    onChange={handleChange}
                                    required

                                />
                            </div>
                            <div className="txtfield">
                                <label htmlFor="image" >
                                    Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept='imafe/*'
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="txtfield">
                                <label htmlFor="description" >
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    required

                                />
                            </div>
                            <div className="txtfield">
                                <label htmlFor="category" >
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    value={product.category}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="txtfield">
                                <label htmlFor="price" >
                                    Price:
                                </label>
                                <input
                                    type="numper"
                                    name="price"
                                    id="price"
                                    value={product.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="txtfield">
                                <label htmlFor="sizes" >
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    value={product.quantity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="txtfield">
                                <label htmlFor="sizes" >
                                    Sold Item
                                </label>
                                <input
                                    type="number"
                                    name="slod"
                                    id="slod"
                                    value={product.sold}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit">
                                Add Product
                            </button>
                        </form>
                    </div>
                    <div className='contant'>
                        <Toolbar />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Description</TableCell>
                                       {/* <TableCell>Categorise</TableCell> */}
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Quantity</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell>{product.title}</TableCell>
                                            <TableCell><img src={product.image} alt={product.title} width={60}></img></TableCell>
                                            <TableCell>{product.description}</TableCell>
                                            {/* <TableCell>{product.category}</TableCell> */}
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.sold}</TableCell>
                                            <TableCell>{product.createdAt}</TableCell>
                                            <TableCell>
                                            <IconButton
                                                color="secondary"
                                                aria-label="edit"
                                                onClick={() => {
                                                    handleEdit(
                                                        product._id,
                                                        product.slug,
                                                        product.title,
                                                        product.image,
                                                        product.description,
                                                        product.category,
                                                        product.quantity,
                                                        product.sold,
                                                        product.shipping,
                                                        product.price
                                                    )
                                                }}
                                                
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            </TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            
                        </Table>
                    </TableContainer>
                </div>
            </div>
            

        </div>
        

            )
    }

export default UpdatingProducts
