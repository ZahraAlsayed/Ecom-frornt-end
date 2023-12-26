/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import jwtDecode from "jwt-decode"

import '../style/register.css'
import { activateUser } from '../services/userServices'
import { ToastContainer, toast } from 'react-toastify'
const ActivatePage = () => {

    const navigate = useNavigate()

    const { token } = useParams()
    const decoded = jwtDecode(String(token))
    console.log(decoded)
    const handelActivate = async () => {
        try {
            const response = await activateUser(String(token))
            toast.success(`${response.message}`, {
                position: "top-right",
                autoClose: 3000, // Duration in milliseconds
            });
            navigate('/login')
        } catch (error) {
           
            toast.error("error.response.data.massage", {
                position: "top-right",
                autoClose: 3000, // Duration in milliseconds
            });
        }
    }

    return (

        <div >
            <div className="center">
                <img
                    src='https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446913/l4jfqz1qr7l7pizru9r4.png'
                    alt="Logo"
                    width={190}
                />
                <h1>Activate Account</h1>
                 <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                    newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <img
                    src='https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446818/mhtp6yowrohc90zbptbj.png'
                    alt="Logo"
                    width={290}
                />
                <h2>welcome back, {decoded.name}</h2>
                <button onClick={handelActivate} type='submit' value="activate">Activate your Account </button>
            </div>
        </div>

    )
}

export default ActivatePage
