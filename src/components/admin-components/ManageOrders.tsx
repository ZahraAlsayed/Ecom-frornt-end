/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer
} from '@mui/material';


import '../../style/admin.css'
import AdminSidbar from './AdminSidbar';
import AdminHeader from './AdminHeader';
import Orders from './Orders';

const ManageOrders = () => {


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
                    <Orders />
                </div>



            </Container>
        </div>
    )
}
export default ManageOrders
