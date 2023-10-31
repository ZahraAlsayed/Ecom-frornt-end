/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    Paper,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteUser, fechUsers } from '../../redux/slices/userslices/userSlice';
import '../../style/admin.css'

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, isLoading, error } = useSelector((state: RootState) => state.users);
    //const users = state.users;

    useEffect(() => {
        dispatch(fechUsers());
    }, [])

    const handelDelete = (id: number) => {
        dispatch(deleteUser(id));
    };

    if (isLoading) {
        return <p>loding ...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <div >
            <div className="sidebar">
                <Toolbar />
                <Typography variant="h4">User List</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="add">
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton color="secondary" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            aria-label="delete"
                                            onClick={() => {
                                                handelDelete(user.id);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
       
    );
};

export default UserList
