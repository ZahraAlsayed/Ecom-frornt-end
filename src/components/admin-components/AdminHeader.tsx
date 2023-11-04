/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import '../../style/adminHeader.css'

const AdminHeader = () => {
    return (
        <div>
            <header className="header">
                <div className="header__logo">
                    <img
                        src='../../src/assets/logo-techtrove.png'
                        alt="Logo"
                        width={180}
                    />
                </div>
                <div className="header__nav">
                    <div className="header__option">
                        <Link className='text' to='/dashboard/admin'>
                        <span className="header__optionLineTwo">Home</span>
                        </Link>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineTwo"> <AccountCircleIcon fontSize="small" /></span>
                    </div>
                    <div className="header__option">
                            <Link className='text' to='/login'>
                            <span className="header__optionLineTwo"><ExitToAppIcon fontSize="small" /></span>
                        </Link>
                    </div>

                </div>

            </header>
        </div>
    )
}

export default AdminHeader
