/* eslint-disable prettier/prettier */
import React from 'react';

import {
    Paper,
    Avatar,
    Typography,
    Grid,
    Button,
    Container,
}
    from '@mui/material';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';

const AdminProfile = () => {
    return (
        <Container >
            <AdminHeader/>
            <Paper elevation={8} style={{ padding: '70px', textAlign: 'center' }}>
                <Avatar
                    alt="User Profile"
                    src="path_to_profile_image.jpg"
                    sx={{ width: 100, height: 100, margin: '0 auto' }}
                />
                <Typography variant="h4" sx={{ margin: '20px' }}>
                    John Doe
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                    Email: johndoe@example.com
                </Typography>
            </Paper>
            <AdminFooter/>
        </Container>
    )

}

export default AdminProfile