/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Error = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/')

    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
            <Button onClick={handleNavigation}><h3>go hmoe </h3></Button>
            <img src='https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446913/vrrvkzbhanuaoe9tvci3.png' alt='Error' width={900} />
        </div>

    )
}

export default Error
