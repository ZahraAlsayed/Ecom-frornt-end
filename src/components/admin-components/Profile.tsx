/* eslint-disable prettier/prettier */
import React, { ChangeEvent, FormEvent, useState } from 'react';

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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateUser } from '../../redux/slices/userslices/userSlice';

const AdminProfile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state.users)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [user, setUser] = useState({
        name: userData?.name
    })
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
    }

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