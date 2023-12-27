import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { fechUsers, login } from '../redux/slices/userslices/userSlice'
import '../style/register.css'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.users

  useEffect(() => {
    dispatch(fechUsers())
  }, [])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }
  const validateForm = () => {
    const newErrors = { ...errors }
    // Validate email
    if (!user.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid , plase Enter Valid Email'
    } else {
      newErrors.email = ''
    }

    // Validate password
    if (!user.password || user.password.length < 2) {
      newErrors.password = 'Password must be at least 6 characters'
    } else {
      newErrors.password = ''
    }

    setErrors(newErrors)

    // Return true if there are no errors, indicating the form is valid
    return !Object.values(newErrors).some((error) => !!error)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const foundUser = users.items.find(
      (userData) => userData.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()
    )
    console.log(users.items)

    if (!validateForm()) {
      return // If the form is not valid, do not submit.
    }
    if (foundUser && foundUser.email === user.email) {
      dispatch(login(user))
      if (foundUser.isAdmin) {
        navigate('/dashboard/admin')
      } else {
        navigate('/')
      }
      toast.success(`${foundUser.name} you are loggin now`)
    } else {
      toast.error('Invalid email or password')
    }

    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <div className="center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <img
        src="https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446913/l4jfqz1qr7l7pizru9r4.png"
        alt="Logo"
        width={190}
      />
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="txtfield">
          <input
            type="text"
            id="username"
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
          <div>
            <span className="error-message">{errors.password}</span>
          </div>
        </div>
        <div className="pass">
          <Link to="/users/forget-password">Forgot Password?</Link>
        </div>
        <button type="submit" value="Login">
          Login
        </button>
        <div className="signup_link">
          Not register? <Link to="/singup">Signup</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
