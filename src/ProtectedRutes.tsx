/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { RootState } from './redux/store'
import Login from './components/Login';

function ProtecyedRout() {
    const pageLacation = useLocation()
    const { isLoggedIn } = useSelector((state: RootState) => state.users)
    return isLoggedIn ? <Outlet /> : <Login pathName={pageLacation.pathname} />

}

export default ProtecyedRout
