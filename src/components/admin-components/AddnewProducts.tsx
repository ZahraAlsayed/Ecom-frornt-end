import { Container, CssBaseline, Drawer, Typography } from '@mui/material'

import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import UpdatingProducts from './UdpatingProducts'

import '../../style/admin.css'

const AddNewProducts = () => {
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
      <Container>
        <header>
          <AdminHeader />
        </header>
        <div>
          <div>
            <Typography variant="h4">Products List</Typography>
            <UpdatingProducts />
          </div>
        </div>
      </Container>
    </div>
  )
}
export default AddNewProducts
