/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import err404 from '../assets/err404.png'

const Error = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/')

    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
            <Button onClick={handleNavigation}><h3>go hmoe </h3></Button>
            <img src={err404} alt='Error' width={900} />
        </div>

    )
}

export default Error
