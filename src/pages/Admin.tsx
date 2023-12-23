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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ChangeEvent, FormEvent, useState } from 'react';
import { updateUser } from '../redux/slices/userslices/userSlice';

const Admin = () => {
const dispatch = useDispatch<AppDispatch>()
  const { userData } = useSelector((state: RootState) => state.users)
  const [isFormOpen, setIsFormOpen] = useState(false)
    const [user, setUser] = useState({
        name: userData?.name
    })
    console.log(userData)
    const [userNameError, setUserNameError] = useState('')

    const handleFormOpen = () => {
        setIsFormOpen(!isFormOpen)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUser((prevUser) => {
            return { ...prevUser, [name]: value }
        })
    }
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const updatUserData = { _id: userData?._id, ...user }
        dispatch(updateUser(updatUserData))
        setIsFormOpen(false)
    }

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
                    {userData && (
                        <Paper elevation={8} style={{ padding: '70px', textAlign: 'center' }}>
                            <Avatar
                                alt={userData?.name}
                                src={userData?.image}
                                sx={{ width: 100, height: 100, margin: '0 auto' }}
                                
                            />
                            <Typography >
                               {`${userData?.name}`}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                                Role: {`${userData?.email}` ? 'Admin' : 'User'}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                                Email: {userData?.email}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                                Phone Number: {userData?.phone}
                            </Typography>
                            <button 
                                className="px-10 text-black-50 bg-gray-200 rounded-lg hover:bg-pink-100"
                                onClick={handleFormOpen}>
                                Edit Profile
                            </button>
                            {isFormOpen && (
                                <div className="product-card ">
                                    <form action="" onSubmit={handleSubmit}>
                                        <label>User Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="input-product "
                                            value={user.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <p>{userNameError}</p>

                                        <br></br>
                                        <button className="px-10 text-black-50 bg-gray-200 rounded-lg hover:bg-pink-100 show-more-button">
                                            Update
                                        </button>
                                    </form>
                                </div>
                            )}
                        </Paper>
                    )} 
                </Container>
                    
            </Container>
            {/* <AdminFooter /> */}
        </div>
    )
}
export default Admin
