/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import jwtDecode from "jwt-decode"

import '../style/register.css'
import { activateUser } from '../services/userServices'
import { ToastContainer, toast } from 'react-toastify'
const ForgetPassword = () => {

    const navigate = useNavigate()


    return (
        <div className="center">
            <img
                src='..\src\assets\logo-techtrove.png'
                alt="Logo"
                width={190}
            />
            <h1>Rest Password</h1>
            <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <form onSubmit={handleSubmit}>
                <div className="txtfield">
                    <input
                        type="text"
                        id="username"
                        name='email'
                        value={user.email}
                        onChange={handleInputChange}
                        required />
                    <span></span>
                    <label htmlFor="email" >Email</label>
                    <div>
                        <span className="error-message">{errors.email}</span>
                    </div>
                </div>
                <button type="submit" value="Login" >Login</button>
                <div className="signup_link">
                    Not register? <Link to='/singup'>Signup</Link>
                </div>
            </form>
        </div>

    )
}

export default ForgetPassword
