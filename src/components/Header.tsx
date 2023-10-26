/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'

import '../style/header.css'

const Header = () => {
    return (
        <div>
            <header className="header">
                <div className="header__logo">
                    <img
                        src="data:image/png;base64,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" width={70}
                        alt="Amazon Logo"
                    />
                </div>

                <div className="header__search">
                    <input

                        type="text"
                        className="header__searchInput"
                        placeholder="Search for products..."
                    />
                </div>

                <div className="header__nav">
                    <div className="header__option">
                        <span className="header__optionLineTwo">Products</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineTwo">Contact Us</span>
                    </div>

                    <div className="header__option">
                        <span className="header__optionLineTwo">Cart</span>
                    </div>

                    <div className="header__option">
                        <Link to={'/login'}>
                            <span className="header__optionLineTwo">Login / Sing Up</span>
                        </Link>

                    </div>


                </div>

            </header>
        </div>
    )
}

export default Header
