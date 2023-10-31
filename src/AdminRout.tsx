/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { RootState } from '././redux/store'
import Login from './components/Login';

function ProtecyedRout() {
    const { isLoggedIn } = useSelector((state: RootState) => state.users)
    return isLoggedIn ? <Outlet /> : <Login />

}

export default ProtecyedRout
