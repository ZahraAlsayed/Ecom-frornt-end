/* eslint-disable prettier/prettier */
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fechUsers ,login} from '../redux/slices/userslices/userSlice';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const users = state.users

    useEffect(() => {
        dispatch(fechUsers())
    }
        , [])

    if (users.isLoading) {
        return <p>loding ...</p>
    }
    if (users.error) {
        return <p>{users.error}</p>
    }
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const handleInputChange = (event :ChangeEvent<HTMLInputElement>) => {
        setUser((pervState) => {
            return { ...pervState,[event.target.name]: event.target.value}
        }
            
       ) 
    };
    const handleSubmit = (event : FormEvent) => {
        event.preventDefault();
        const foundUser = users.items.find(userData => userData.email == user.email)
        if (foundUser && foundUser.password == user.password) {
            dispatch(login(foundUser))
        } else {
            console.log("nothing match")
        }
            
        setUser({
            email:'',
            password:''
        })
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="username"
                        name='email'
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        value={user.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login
