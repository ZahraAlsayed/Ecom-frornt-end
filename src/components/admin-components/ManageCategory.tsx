/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer,

} from '@mui/material'

import Categories from './Categories'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

import '../../style/table.css'
import '../../style/admin.css'


const ManageCategory = () => {


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
                <AdminHeader />
                <div className="table-container">
                    <Categories />
                </div>

            </Container>
        </div>
    )
}
export default ManageCategory
