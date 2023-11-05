/* eslint-disable prettier/prettier */
import {
    Container,
    CssBaseline,
    Drawer,
    Typography,
    Paper,
    Avatar
} from '@mui/material';

import AdminFooter from '../components/admin-components/AdminFooter';
import AdminHeader from '../components/admin-components/AdminHeader';
import AdminSidebar from '../components/admin-components/AdminSidebar';

import '../style/admin.css'

const Admin = () => {


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
            <Container>
                <header><AdminHeader /></header>
                <Container maxWidth='md'>
                    <Paper elevation={8} style={{ padding: '70px', textAlign: 'center' }}>
                        <Avatar
                            alt="User Profile"
                            src="path_to_profile_image.jpg"
                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                        />
                        <Typography variant="h4" sx={{ margin: '70px' }}>
                            John Doe
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                            Email: johndoe@example.com
                        </Typography>
                    </Paper>
                </Container>
            </Container>
            <AdminFooter />
        </div>
    )
}
export default Admin
