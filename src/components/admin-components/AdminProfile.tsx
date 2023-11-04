/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer
} from '@mui/material';


import AdminSidbar from './AdminSidbar'
import AdminHeader from './AdminHeader'

import '../../style/admin.css'
import Profile from './Profile';
function AdminProfile() {
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
                <AdminSidbar />
            </Drawer>
            <Container className="table-container">
                <header><AdminHeader /></header>
                <div >
                    <Profile />
                </div>
            </Container>
        </div>


    )

}

export default AdminProfile
