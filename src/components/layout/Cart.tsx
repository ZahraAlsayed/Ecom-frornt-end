/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    IconButton
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from '@mui/icons-material/Delete';

import { AppDispatch, RootState } from '../../redux/store'
import { removeAllFromCart, removeFromCart } from '../../redux/slices/products/cartSlice';

import Footer from './Footer'
import Header from './Header';

import '../../style/cart.css'


const Cart = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { cartItems } = useSelector((state: RootState) => state.cart)

    const handelRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id))
        toast.success('Product removed successfully')

    }
    const handelRemoveAllFromCart = (id: number) => {
        dispatch(removeAllFromCart)
        toast.success('Product removed successfully', { position: 'bottom-right' })
    }
    const totalAmountOfCart = () => {
        let totalAmount = 0
        cartItems.length > 0 && cartItems.map((item) => totalAmount = totalAmount + item.prise)

        return totalAmount
    }




    return (
        <div >
            <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick
                rtl={false} pauseOnFocusLoss
                draggable pauseOnHover />
            <Header />
            <div className='contanter'>
                <div>
                    <div className="container">
                        <div className="cart">
                            {cartItems.length > 0 && (
                                <div className="products">
                                    {cartItems.map((item) => (
                                        <div className="product" key={item.id} >
                                            <img src={item.image} alt={item.name} />
                                            <div className="product-info">
                                                <h3 className="product-name">{item.name}</h3>
                                                <h4 className="product-price">{item.prise} ASR</h4>
                                                <h4 className="product-price">{item.description} </h4>
                                                <p className="product-remove">
                                                    <span className="remove">
                                                        <IconButton className='remove' color="error" aria-label="delete" onClick={() =>
                                                            handelRemoveFromCart(item.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </span>
                                                </p>


                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                            <div className="cart-total">
                                <p>
                                    <h4>Total Price:</h4>
                                    <span>
                                        <h4>{totalAmountOfCart()} ASR</h4>
                                    </span>
                                </p>
                                <p>
                                    <h5>Number of Items : {cartItems.length}</h5>

                                </p>
                                <h4 className='checkout'>Proceed to Checkout</h4>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Cart
