/* eslint-disable prettier/prettier */
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { fechUsers, login } from '../redux/slices/userslices/userSlice';
import '../style/register.css'

const Login = ({ pathName }: { pathName: string }) => {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const users = state.users

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser((pervState) => {
            return { ...pervState, [event.target.name]: event.target.value }
        }

        )
    };
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const foundUser = users.items.find(userData => userData.email == user.email)
        if (foundUser && foundUser.password == user.password) {
            dispatch(login(foundUser))
            navigate(pathName ? pathName : `/user/${foundUser.role}-page`)
        } else {
            console.log("nothing match")
        }

        setUser({
            email: '',
            password: ''
        })
    };

    return (
        <div className="center">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input
                        type="text"
                        id="username"
                        name='email'
                        value={user.email}
                        onChange={handleInputChange}
                        required />
                    <span></span>
                    <label htmlFor="email" >Email</label>
                </div>
                <div className="txt_field">
                    <input
                        type="password"
                        id="password"
                        name='password'
                        value={user.password}
                        onChange={handleInputChange}
                        required />
                    <span></span>
                    <label htmlFor="password" >Password</label>
                </div>
                <div className="pass">Forgot Password?</div>
                <button type="submit" value="Login" >Login</button>
                <div className="signup_link">
                    Not register? <Link to='/singup'>Signup</Link>
                </div>
            </form>
        </div>

    );
};

export default Login
