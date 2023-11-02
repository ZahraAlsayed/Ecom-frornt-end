/* eslint-disable prettier/prettier */
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    CssBaseline,
    Drawer,
    Typography,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


import '../../style/admin.css'
import AdminSidbar from './AdminSidbar';
import AdminHeader from './AdminHeader';
import Products from './Products';
import { NewProductWrapper } from '../NewProductWrapper';
import UpdatingProducts from './UdpatingProducts';
import { ProductForm } from './ProductForm';

const AddNewProducts = () => {


    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 240,
                    flexShrink: 0,
                }}
            >
                <h1>
                    <img
                        src='..\src\assets\logo-techtrove.png'
                        alt="Logo"
                        width={140}
                    />
                </h1>
                <AdminSidbar />
            </Drawer>
            <Container>
                <header><AdminHeader /></header>
                <div>


                    <div >
                        <Typography variant="h4">Products List</Typography>
                        <UpdatingProducts />
                    </div>


                </div>



            </Container>
        </div>
    )
}
export default AddNewProducts
