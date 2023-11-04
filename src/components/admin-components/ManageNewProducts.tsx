/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer
} from '@mui/material'

import AdminSidbar from './AdminSidbar'
import AdminHeader from './AdminHeader'
import ProductsManager from '../ProductsManager'

import '../../style/table.css'
import '../../style/admin.css'
import AdminFooter from './AdminFooter'
const ManageNewProdcuts = () => {


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

                    <ProductsManager />
                </div>
            </Container>
        </div>
    )
}
export default ManageNewProdcuts
