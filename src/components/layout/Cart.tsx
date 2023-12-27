import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteIcon from '@mui/icons-material/Delete'

import { AppDispatch, RootState } from '../../redux/store'
import { removeAllFromCart, removeFromCart } from '../../redux/slices/products/cartSlice'

import Payment from './Payment'
import Footer from './Footer'
import Header from './Header'

import '../../style/cart.css'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const { isLoggedIn } = useSelector((state: RootState) => state.users)

  const handelRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id))
    toast.success('Product removed successfully')
  }
  const handelRemoveAllFromCart = (id: string) => {
    dispatch(removeAllFromCart)
    toast.success('Product removed successfully', { position: 'bottom-right' })
  }
  const totalAmountOfCart = () => {
    let totalAmount = 0
    cartItems.length > 0 && cartItems.map((item) => (totalAmount = totalAmount + item.price))

    return totalAmount
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <div className="contanter">
        <div>
          <div className="container">
            <div className="cart">
              {cartItems.length > 0 && (
                <div className="products">
                  {cartItems.map((item) => (
                    <div className="product" key={item._id}>
                      <img src={item.image} alt={item.title} />
                      <div className="product-info">
                        <h3 className="product-name">{item.title}</h3>
                        <h4 className="product-price">{item.price} ASR</h4>
                        <h4 className="product-price">{item.description} </h4>
                        <p className="product-remove">
                          <span className="remove">
                            <IconButton
                              className="remove"
                              color="error"
                              aria-label="delete"
                              onClick={() => handelRemoveFromCart(item._id)}>
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
                <div>
                  {isLoggedIn ? (
                    <div>
                      {cartItems.length > 0 ? (
                        <Payment cartItems={cartItems} amount={totalAmountOfCart()} />
                      ) : (
                        <h1>Your cart is empty.</h1>
                      )}
                    </div>
                  ) : (
                    <h1>Plase Login To show your cart.</h1>
                  )}
                </div>
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
