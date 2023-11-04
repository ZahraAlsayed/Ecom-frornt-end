/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer
} from '@mui/material'



import AdminSidbar from './AdminSidbar'
import AdminHeader from './AdminHeader'
import Orders from './Orders'

import '../../style/admin.css'
import '../../style/table.css'

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
                <AdminSidbar />
            </Drawer>
            <Container className="table-container">
                <header><AdminHeader /></header>
                <div className="table-container">
                    <Orders />
                </div>
            </Container>
        </div>
    )
}
export default ManageOrders
