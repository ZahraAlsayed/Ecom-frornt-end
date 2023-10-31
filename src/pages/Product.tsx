/* eslint-disable prettier/prettier */
import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia, Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Container from '@mui/material/Container'

import { AppDispatch, RootState } from '../redux/store'
import { findProductBId, fetchProducts } from '../redux/slices/products/productSlice'
import { addToCart } from '../redux/slices/products/cartSlice'
import Header from '../components/Header'
import '../style/product.css'
import { fechCategories } from '../redux/slices/products/categorySlice'



const Product = () => {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const product = state.products
    const categories = state.categories



    useEffect(() => {
        dispatch(fetchProducts()).then(() =>
            dispatch(findProductBId(id))
        )
    }
        , [])

    useEffect(() => {
        dispatch(fechCategories())
    }
        , [])

    const getCategoryName = (categoryId: number) => {
        const categoryItem = categories.items.find((category) => category.id == categoryId)
        return categoryItem ? categoryItem.name + '  ' + "  " : "Category not found"
    }

    if (product.isLoading) {
        return <p>loding ...</p>
    }
    if (product.error) {
        return <p>{product.error}</p>
    }
    console.log(product.singleProduct)

    return (

        <div>
            <Header />
            <div className="container">
                {product.singleProduct && (
                    <div className="box">
                        <div className="images">
                            <div className="img-holder active">
                                <img src={product.singleProduct.image} alt={product.singleProduct.name} />
                            </div>
                        </div>
                        <div className="basic-info">
                            <h2>{product.singleProduct.name}</h2>
                            <Typography  >
                                Categories :
                                {product.singleProduct.categories.map((categoryId) =>
                                    getCategoryName(Number(categoryId))
                                )}
                            </Typography>

                            <span>
                                {product.singleProduct.sizes.map((size) => (
                                    <Typography className='category' key={size}>{size}</Typography>
                                ))}
                            </span>
                            <span>
                                {product.singleProduct.variants.map((variant) => (
                                    <Typography className='category' key={variant}>{variant} </Typography>

                                ))}
                            </span>

                            <span>{product.singleProduct.prise} ARS</span>
                            <div className="description">
                                <Typography>{product.singleProduct.description}</Typography>
                            </div>
                            <div className="options">
                                <Link to={`/add-to-cart/${product.singleProduct.id}`}><Button  >Add to Cart</Button></Link>

                            </div>
                            <div className="options">
                                <Button  >Back to Shop</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}
export default Product
