/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import '../style/header.css'

const Header = () => {
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
                        <span className="header__optionLineTwo">Home</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineTwo">Products</span>
                    </div>

                    <div className="header__option">
                        <span className="header__optionLineTwo"> <ShoppingCartIcon /></span>
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
