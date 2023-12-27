import { useNavigate } from 'react-router-dom'
import { Container, CssBaseline, Drawer, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import Products from './Products'

import '../../style/admin.css'
import '../../style/table.css'

const ManageProducts = () => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('/dashboard/admin/addpoduct')
  }

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
          <h2>Products List</h2>
          <h3>
            Add Products{' '}
            <IconButton color="primary" aria-label="add">
              <span onClick={handleNavigation}>
                {' '}
                <AddIcon />
              </span>
            </IconButton>
          </h3>
          <Products />
        </div>
      </Container>
    </div>
  )
}
export default ManageProducts
