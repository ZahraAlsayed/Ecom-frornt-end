/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'



const AdminRouting = () => {
    const navigate = useNavigate()
    const state = useSelector((state: RootState) => state)
    const users = state.users

    return (
        <>
            {users.isLoggedIn && users.userData?.isAdmin === 'admin' ? (

                <Outlet />
            ) : (
                navigate('*')
            )
            }
        </>
    )
}
export default AdminRouting



