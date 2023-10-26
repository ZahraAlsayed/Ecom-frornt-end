/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import Header from '../components/Header'
import Siadbar from './AdminSidbar';
import { fechUsers } from '../redux/slices/userslices/userSlice';
import { fechCategories } from '../redux/slices/products/categorySlice';
import { fechOrders } from '../redux/slices/userslices/orderSlice';

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const users = state.users

    useEffect(() => {
        dispatch(fechUsers())
    }
        , [])

    if (users.isLoading) {
        return <p>loding ...</p>
    }
    if (users.error) {
        return <p>{users.error}</p>
    }

    return (
        <div >

            <div className="card grid gap-4">
                <ul>
                    {users.items.map((user) => (
                        <li key={user.id} className="flex items-center gap-4 text-2xl mb-2">
                            <span>{user.firstName}</span>
                            <span>{user.email}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}
export default UserList
