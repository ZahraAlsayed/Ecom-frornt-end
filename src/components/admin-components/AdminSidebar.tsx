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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import CategoryIcon from '@mui/icons-material/Category'
import Person2Icon from '@mui/icons-material/Person2'
import LogoutIcon from '@mui/icons-material/Logout'

import '../../style/admin.css'

const AdminSidebar = () => {
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
                    <ListItemText primary="Admin Dashboard" />

                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon color="action" />
                    </ListItemIcon>
                    Home
                </ListItem>
                <Link className='text' to='/dashboard/admin/products'>
                    <ListItem button>
                        <ListItemIcon>
                            <ProductionQuantityLimitsIcon color="action" />
                        </ListItemIcon>
                        Products List </ListItem>
                </Link>
                <Link className='text' to='/dashboard/admin/users'>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleOutlineIcon color="action" />
                        </ListItemIcon>
                        Mange Users </ListItem>
                </Link>

                <Link className='text' to='/dashboard/admin/categories'>
                    <ListItem button>
                        <ListItemIcon>
                            <CategoryIcon color="action" />
                        </ListItemIcon>
                        Mange Categoris
                    </ListItem>
                </Link>
                <Link className='text' to='/dashboard/admin/orders'>
                    <ListItem button>
                        <ListItemIcon>
                            <ChecklistRtlIcon color="action" />
                        </ListItemIcon>
                        Mange Orders
                    </ListItem>
                </Link>
                <Link className='text' to='/dashboard/admin/profile'>
                <ListItem button>
                    <ListItemIcon>
                        <Person2Icon color="action" />
                    </ListItemIcon>
                        Admin Profile
                    </ListItem>
                </Link>
                <Link className='text' to='/login'>
                <ListItem button>
                    <ListItemIcon>
                        <LogoutIcon color="action" />
                    </ListItemIcon>
                    Log out
                    </ListItem>
                </Link>

            </List>
        </div>
    );
};

export default AdminSidebar
