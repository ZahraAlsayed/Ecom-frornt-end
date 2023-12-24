/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import jwtDecode from "jwt-decode"

import '../style/register.css'
import { ToastContainer, toast } from 'react-toastify'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { forgetPassword } from '../redux/slices/userslices/userSlice'


const ForgetPassword = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')


    const navigate = useNavigate()
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        let newError =''
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newError = 'Email is invalid , plase Enter Valid Email';
        } else {
            newError = ''
        }
        setEmailError(newError)
        const response = await dispatch(forgetPassword(email))
        toast.success(`${response.payload.message}`)
    }


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
                        id="email"
                        name='email'
                        value={email}
                        onChange={handleInputChange}
                        required />
                    <span></span>
                    <label htmlFor="email" >Email</label>
                    <div>
                        <span className="error-message">{emailError}</span>
                    </div>
                </div>
                <button type="submit" value="Login" >Send</button>
                <div className="signup_link">
                    Not register? <Link to='/singup'>Signup</Link>
                </div>
                <div className="signup_link">
                     Alrady register? <Link to='/login'>Log In</Link>
                </div>
            </form>
        </div>

    )
}

export default ForgetPassword
