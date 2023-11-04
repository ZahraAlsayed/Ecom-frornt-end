/* eslint-disable prettier/prettier */
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../redux/store';
import { addNewUser } from '../redux/slices/userslices/userSlice';
import '../style/register.css';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state);
    const users = state.users;

    const [user, setUser] = useState({
        fristName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        fristName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const validateForm = () => {
        const newErrors = { ...errors };

        // Validate fristName
        if (!user.fristName || user.fristName.length < 2) {
            newErrors.fristName = 'Plase Enter valid Name'
        } else {
            newErrors.fristName = '';
        }

        // Validate lastName
        if (!user.lastName || user.lastName.length < 2) {
            newErrors.lastName = 'Plase Enter valid Name'
        } else {
            newErrors.lastName = '';
        }

        // Validate email
        if (!user.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = 'Email is invalid , plase Enter Valid Email';
        } else {
            newErrors.email = '';
        }

        // Validate password
        if (!user.password || user.password.length < 2) {
            newErrors.password = 'Password must be at least 6 characters'
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);

        // Return true if there are no errors, indicating the form is valid
        return !Object.values(newErrors).some((error) => !!error);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Validate the form
        if (!validateForm()) {
            return; // If the form is not valid, do not submit.
        }

        const foundUser = users.items.find((userData) => userData.email === user.email);
        if (foundUser && foundUser.password === user.password) {
            alert('User with this email is already registered. Please log in.');
        } else {
            dispatch(addNewUser(foundUser));
        }

        setUser({
            fristName: '',
            lastName: '',
            email: '',
            password: '',
        });
    };

    return (
        <div className="center">
            <img
                src="..\src\assets\logo-techtrove.png"
                alt="Logo"
                width={190}
            />
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="txtfield">
                    <input
                        type="text"
                        id="fristName"
                        name="fristName"
                        value={user.fristName}
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="fristName">First Name</label>
                    <div >
                        <span className="error-message">{errors.fristName}</span>
                    </div>
                </div >
                <div className="txtfield">
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="lastName">Last Name</label>
                    <div>
                        <span className="error-message">{errors.lastName}</span>
                    </div>

                </div>
                <div className="txtfield">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="email">Email</label>
                    <div>
                        <span className="error-message">{errors.email}</span>
                    </div>

                </div>
                <div className="txtfield">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="password">Password</label>
                    <span className="error-message">{errors.password}</span>
                </div>
                <div className="pass">Forgot Password?</div>
                <button type="submit" value="signup">Sign Up</button>
                <div className="signuplink">
                    Already registered? <Link to="/login">Login</Link>
                </div>
            </form >
        </div >
    )
}

export default Login
