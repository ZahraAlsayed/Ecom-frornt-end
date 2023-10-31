/* eslint-disable prettier/prettier */
import { useState } from 'react';

import { Link } from 'react-router-dom';

import {
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import '../../style/admin.css'
const AdminSidbar = () => {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(!open);
    }
    return (
        <div className='siad-bar'>
            <CssBaseline />
            <Drawer
                variant="permanent"
                open={open}
            />
            <Toolbar />
            <List className='list' style={{ height: "80vh" }}>
                <ListItem button >
                    <ListItemIcon>
                        <MenuIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin Opreations" />

                </ListItem>

                <ListItem button>Home </ListItem>
                <Link className='text' to='/dashboard/admin/products'>
                    <ListItem button>Products List </ListItem>
                </Link>
                <Link className='text' to='/dashboard/admin/usres'>
                    <ListItem button>Mange Users </ListItem>
                </Link>
                <Link className='text' to='/dashboard/admin/orders'>
                    <ListItem button>Mange Orders </ListItem>

                </Link>

                <Link className='text' to='/dashboard/admin/categories'>
                    <ListItem button>Mange Categoris </ListItem>
                </Link>
                <ListItem button>Admin Profile  </ListItem>
                <ListItem button>Log out </ListItem>

            </List>
        </div>
    );
};

export default AdminSidbar;
