import { Container, CssBaseline, Drawer } from '@mui/material'

import AdminSidebar from './AdminSidebar'
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
          flexShrink: 0
        }}>
        <AdminSidebar />
      </Drawer>
      <Container className="table-container">
        <header>
          <AdminHeader />
        </header>
        <div className="table-container">
          <Orders />
        </div>
      </Container>
    </div>
  )
}
export default ManageOrders
