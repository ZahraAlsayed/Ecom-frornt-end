/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer
} from '@mui/material';


import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import Profile from './Profile'

import '../../style/admin.css'

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
                <AdminSidebar />
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
