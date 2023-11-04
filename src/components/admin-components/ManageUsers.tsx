/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer
} from '@mui/material';


import AdminSidbar from './AdminSidbar'
import AdminHeader from './AdminHeader'
import UserList from './UsersList'

import '../../style/admin.css'
import '../../style/table.css'

const ManageUsers = () => {


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
                        src='../../src/assets/logo-techtrove.png'
                        alt="Logo"
                        width={140}
                    />
                </h1>
                <AdminSidbar />
            </Drawer>
            <Container className="table-container">
                <header><AdminHeader /></header>
                <div className="table-container">
                    <UserList />
                </div>
            </Container>
        </div>
    )
}
export default ManageUsers
