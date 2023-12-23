/* eslint-disable prettier/prettier */
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../redux/store';
import '../style/register.css';
import { ToastContainer, toast } from 'react-toastify';
import { registerNewUser } from '../services/userServices';
import { fechUsers } from '../redux/slices/userslices/userSlice';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state);
    const users = state.users;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        phone: '',
        address: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        dispatch(fechUsers())
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.type === 'file') {
            const fileInput = (event.target as HTMLInputElement) || ''
            console.log(fileInput.files?.[0])
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: fileInput.files?.[0] };
            });
        } else {
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: event.target.value };
            });
        }
    }



    const validateForm = () => {
        const newErrors = { ...errors };

        // Validate fristName
        if (!user.name || user.name.length < 2) {
            newErrors.name = 'Plase Enter valid Name'
        } else {
            newErrors.name = '';
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
        if (!user.address || user.address.length < 2) {
            newErrors.name = 'Plase Enter valid address'
        } else {
            newErrors.name = '';
        }
        if (!user.phone || user.phone.length < 9) {
            newErrors.name = 'Plase Enter valid phone number'
        } else {
            newErrors.name = '';
        }

        setErrors(newErrors);

        // Return true if there are no errors, indicating the form is valid
        return !Object.values(newErrors).some((error) => !!error);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", user.name)
        formData.append("email", user.email)
        formData.append("phone", user.phone)
        formData.append("address", user.address)
        formData.append("image", user.image)
        formData.append("password", user.password)
       
        const foundUser = users.items.find((userData) => userData.email === user.email);

        try {

            // Validate the form
            if (!validateForm()) {
                return; // If the form is not valid, do not submit.
            }
            const response = await registerNewUser(formData)
            console.log(response)
            if (foundUser && foundUser.email === user.email) {
                alert('User with this email is already registered. Please log in.');
            }
            toast.success(`${response.message}`, {
                position: "top-right",
                autoClose: 3000, // Duration in milliseconds
            });
            navigate('/login')
            
        } catch (error : any) {
            toast.error(`${ error.response.data.message }`, {
                position: "top-right",
                autoClose: 3000, // Duration in milliseconds
            });
        }


        setUser({
            name: '',
            email: '',
            password: '',
            image: '',
            phone: '',
            address: ''
        });
    };

    return (
        <div className="center">
            <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <img
                src="..\src\assets\logo-techtrove.png"
                alt="Logo"
                width={170}
            />
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="txtfield">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="fristName">User Name</label>
                    <div >
                        <span className="error-message">{errors.name}</span>
                    </div>
                </div >
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
                        type="tel"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="password">phone Number</label>
                    <span className="error-message">{errors.phone}</span>
                </div>
                <div className="txtfield">
                    <textarea
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="address">Address</label>
                    <span className="error-message">{errors.address}</span>
                </div>
                <div className="txtfield">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept='image/*'
                        onChange={handleInputChange}
                        required
                    />
                    <span></span>
                    <label htmlFor="image"></label>
                    <span className="error-message">{errors.image}</span>
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
