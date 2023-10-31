/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import {
    Container,
    CssBaseline,
    Drawer
} from '@mui/material';


import '../../style/admin.css'
import AdminSidbar from './AdminSidbar';
import AdminHeader from './AdminHeader';
import Products from './Products';

const ManageProduts = () => {


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
                    <Products />
                </div>



            </Container>
        </div>
    )
}
export default ManageProduts
