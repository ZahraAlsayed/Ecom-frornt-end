/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Typography,
    Button
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppDispatch, RootState } from '../redux/store'
import {  fetchProducts, Product, fetchProduct } from '../redux/slices/products/productSlice'
import { addToCart } from '../redux/slices/products/cartSlice'
import Header from '../components/layout/Header'
import { ToastContainer, toast } from 'react-toastify'

import '../style/product.css'
import Footer from '../components/layout/Footer'
import { baseURL } from '../api';



const ProductDetails = () => {
    const { slug } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const product = state.products
    const categories = state.categories

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/");

    }
  
        useEffect(() => {
            dispatch(fetchProduct(slug))
        }, [])

        // if (product.items.length > 0) {
        //     dispatch(fetchProduct(slug))
        // } else {
        //     // if there were no products in the store, fetch them and then find the product by ID
        //     dispatch(fetchProducts()).then(() => dispatch(findProductBId(slug)))
        // }
  

    const getCategoryName = (categoryId: string) => {
        
        const categoryItem = categories.items.find((category) => category._id == categoryId)
        return categoryItem ? categoryItem.name + '  ' + "  " : "Category not found"
    }
    const handelAddToCart = (product: Product) => {
        dispatch(addToCart(product))
        toast.success(`${product} added to cart`, {
            position: "top-right",
            autoClose: 3000, // Duration in milliseconds
        });
    }

    // if (product.isLoading) {
    //     return <p>loding ...</p>
    // }
    // if (product.error) {
    //     return <p>{product.error}</p>
    // }
    console.log(product.singleProduct.category)

    return (

        <div>
            <Header />
            <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick
                rtl={false} pauseOnFocusLoss
                draggable pauseOnHover />

            <div className="container">
                {product.singleProduct && (
                    <div className="box" key={product.singleProduct.slug}>
                        <div className="images">
                            <span onClick={handleNavigation} ><ArrowBackIcon /></span>
                            <div className="img-holder active">
                                <img src={product.singleProduct.image} alt={product.singleProduct.title} />
                            </div>
                        </div>
                        <div className="basic-info">
                            <h2>{product.singleProduct.title}</h2>
                            <Typography  >
                                Categories :
                                {/* {product.singleProduct.category?.map((categoryId) =>
                                    getCategoryName(categoryId)
                                )} */}
                                {product.singleProduct.category}
                            </Typography>

                            {/* <span>
                                {product.singleProduct.sizes?.map((size) => (
                                    <Typography className='category' key={size}>{size}</Typography>
                                ))}
                            </span>
                            <span>
                                {product.singleProduct.variants?.map((variant) => (
                                    <Typography className='category' key={variant}>{variant} </Typography>

                                ))}
                            </span> */}
                            <span>{product.singleProduct.price} SAR</span>
                            <div className="description">
                                <Typography>{product.singleProduct.description}</Typography>
                                <span>
                                <Typography className='category'>Quantity :{product.singleProduct.quantity}</Typography>
                                </span>
                            </div>
                            <div className="options">
                                <Button onClick={() => { handelAddToCart(product.singleProduct) }} >Add to Cart</Button>

                            </div>
                            <div className="options">

                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>

    )
}
export default ProductDetails
