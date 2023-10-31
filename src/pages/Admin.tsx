/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import { Container, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Paper, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Footer from '../components/Footer'
import AdminSidebar from '../components/admin-components/AdminSidbar';
import '../style/admin.css'
import Header from '../components/Header';
import { useState } from 'react';
import AdminFooter from '../components/admin-components/AdminFooter';
import AdminHeader from '../components/admin-components/AdminHeader';
import UserList from '../components/admin-components/UsersList';

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
                <h1>
                    <img
                        src='..\src\assets\logo-techtrove.png'
                        alt="Logo"
                        width={140}
                    />
                </h1>
                <AdminSidebar />
            </Drawer>
            <Container>
                <header><AdminHeader /></header>
                <div>
                    <UserList />
                </div>



            </Container>
        </div>
    )
}
export default Admin
