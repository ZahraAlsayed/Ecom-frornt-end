/* eslint-disable prettier/prettier */
import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'
import { findProductBId, fetchSingleProduct } from '../redux/slices/products/singleProductSlice'
import Header from '../components/Header'


const Product = () => {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const product = state.product

    useEffect(() => {
        dispatch(fetchSingleProduct())
    }
        , [])
    useEffect(() => {
        dispatch(findProductBId(id))
    }
        , [])

    if (product.isLoading) {
        return <p>loding ...</p>
    }
    if (product.error) {
        return <p>{product.error}</p>
    }
    console.log(product.items)

    return (

        <div>
            <Header/>
            {product.singleProduct && (
                <div>

                    <p>oroduct </p>
                    <h2>{product.singleProduct.name}</h2>
                    <img src={product.singleProduct.image} alt={product.singleProduct.name} />
                    <p>{product.singleProduct.description}</p>
                    <p>{product.singleProduct.sizes}</p>

                </div>
            )}
        </div >
    )
}
export default Product
