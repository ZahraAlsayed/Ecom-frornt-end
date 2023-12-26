/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import CartIcon from './CartIcon'
import '../../style/header.css'
import { logout } from '../../redux/slices/userslices/userSlice';

const Header = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { cartItems } = useSelector((state: RootState) => state.cart)
    const {isLoggedIn}  = useSelector((state: RootState) => state.users)
    const handelLogout = () => {
        dispatch(logout())

    }
    return (
        <div>
            <header className="header">
                <div className="header__logo">
                    <img
                        src='https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446913/l4jfqz1qr7l7pizru9r4.png'
                        alt="Logo"
                        width={190}
                    />
                </div>

                <div className="header__nav">

                    <div className="header__option">
                        <Link to={'/'} className='linktext'>
                            <span className="header__optionLineTwo">Home</span>
                        </Link>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineTwo">Products</span>
                    </div>

                    <div className="header__option">
                        <Link to={'/cart'} className='linktext'>
                            <span className="header__optionLineTwo"> <CartIcon value={cartItems.length > 0 ? cartItems.length : 0} /></span>

                        </Link>
                    </div>

                    <div className="header__option">
                        {isLoggedIn ? (
                            <Link to={'/login'} className='linktext' onClick={handelLogout}>
                                <span className="header__optionLineTwo"> <ExitToAppIcon fontSize="small" /></span>
                            </Link>
                        ) : (
                            <Link to={'/login'} className='linktext'>
                                <span className="header__optionLineTwo">Login/SingUp</span>
                            </Link>
                        )}
                    </div>


                </div>

            </header>
        </div>
    )
}

export default Header
