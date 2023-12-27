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
import { forgetPassword, resetPassword } from '../redux/slices/userslices/userSlice'


const RestPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [password, setpasword] = useState('')
    const [passwordError, setpasswordError] = useState('')

    const { token } = useParams()
    const decoded = jwtDecode(String(token))
   


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setpasword(event.target.value)
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        let newError = ''
        if (!password || password.length >2) {
            newError = 'password is invalid , plase Enter Valid password and length 6 at least';
        } else {
            newError = ''
        }
        setpasswordError(newError)
        dispatch(resetPassword({ password, token }))
        toast.success('password updated successfully')
        navigate('/login')
    }


    return (
        <div className="center">
            <img
                src='https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446913/l4jfqz1qr7l7pizru9r4.png'
                alt="Logo"
                width={190}
            />
            <h1>Reset Password</h1>
            
            <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <img
                src='https://res.cloudinary.com/dc9snu7rk/image/upload/v1703638611/x7eqxhupmuwuiv57es9e.png'
                alt="Logo"
                width={290}
            />
            <form onSubmit={handleSubmit}>
                <div className="txtfield">
                    <input
                        type="password"
                        id="password"
                        name='password'
                        value={password}
                        onChange={handleInputChange}
                        required />
                    <span></span>
                    <label htmlFor="password" >New password</label>
                    <div>
                        <span className="error-message">{passwordError}</span>
                    </div>
                </div>
                <button type="submit" value="Login" >Reset</button>
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

export default RestPassword
