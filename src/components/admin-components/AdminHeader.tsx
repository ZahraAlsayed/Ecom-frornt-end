/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import '../../style/header.css'

const AdminHeader = () => {
    return (
        <div>
            <header className="header">
                <div className="header__logo">
                    
                </div>
                <div className="header__nav">
                    <div className="header__option">
                        <span className="header__optionLineTwo">Home</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineTwo"> <AccountCircleIcon fontSize="small" /></span>
                    </div>
                    <div className="header__option">
                        <Link to={'/'}>
                            <span className="header__optionLineTwo">Logout</span>
                           
                        </Link>
                    </div>
                    <div className="header__option">
                        <Link to={'/'}>
                            <span className="header__optionLineTwo"><ExitToAppIcon fontSize="small" /></span>
                            
                        </Link>
                    </div>

                </div>

            </header>
        </div>
    )
}

export default AdminHeader
