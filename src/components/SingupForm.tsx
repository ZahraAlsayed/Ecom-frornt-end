/* eslint-disable prettier/prettier */
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fechUsers, login } from '../redux/slices/userslices/userSlice';
import '../style/register.css'

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const users = state.users

    const navigate = useNavigate()
    const [user, setUser] = useState({
        fristName: '',
        LastName: '',
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
            //navigate(pathName ? pathName : `/user/${foundUser.role}-page`)
        } else {
            console.log("nothing match")
        }

        setUser({
            fristName: '',
            LastName: '',
            email: '',
            password: ''

        })
    };

    return (
        <div className="center">
            <img
                src='..\src\assets\logo-techtrove.png'
                alt="Logo"
                width={190}
            />
            <h1>Sing Up</h1>

            <form onSubmit={handleSubmit}>
                <div className="txtfield">
                    <input
                        type="text"
                        id="frist-name"
                        name='frist-name'
                        value={user.fristName}
                        onChange={handleInputChange}
                        required />
                    <span></span>
                    <label htmlFor="frist-name" >Frist Name </label>
                </div>
                <div className="txtfield">
                    <input
                        type="text"
                        id="last-name"
                        name='last-name'
                        value={user.LastName}
                        onChange={handleInputChange}
                        required />
                    <span></span>
                    <label htmlFor="frist-name" >Last Name</label>
                </div>
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
                </div>
                <div className="txtfield">
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
                <button type="submit" value="singup" >Sing UP</button>
                <div className="signuplink">
                    Already registered ? <Link to=''>Login</Link>
                </div>
            </form>
        </div>

    );
};

export default Login
