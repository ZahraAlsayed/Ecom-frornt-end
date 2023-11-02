/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import '../style/header.css'
import CartIcon from './CartIcon';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { cartItems } = useSelector((state: RootState) => state.cart)
    return (
        <div>
            <header className="header">
                <div className="header__logo">
                    <img
                        src='..\src\assets\logo-techtrove.png'
                        alt="Logo"
                        width={190}
                    />
                </div>

                <div className="header__nav">

                    <div className="header__option">
                        <Link to={'/'}>
                            <span className="header__optionLineTwo">Home</span>
                        </Link>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineTwo">Products</span>
                    </div>

                    <div className="header__option">
                        <Link to={'/cart'}>
                            <span className="header__optionLineTwo"> <CartIcon value={cartItems.length > 0 ? cartItems.length : 0} /></span>

                        </Link>
                    </div>

                    <div className="header__option">
                        <Link to={'/login'}>
                            <span className="header__optionLineTwo">Login/SingUp</span>
                        </Link>

                    </div>


                </div>

            </header>
        </div>
    )
}

export default Header
