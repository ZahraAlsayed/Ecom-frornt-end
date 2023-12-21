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
    const decoded = jwtDecode(token)
    console.log(decoded)
    const handelActivate = async () => {
        try {
            const response = await activateUser(token)
            toast.success(response.data.massage, {
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

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
            <ToastContainer position="top-right"
                autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <h1>Wlkcome back, {decoded.name}</h1>
            <button onClick={handelActivate} type='submit' value="activate">Activate Acount </button>
        </div>

    )
}

export default ActivatePage
