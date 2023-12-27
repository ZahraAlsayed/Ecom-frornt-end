/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../components/layout/Cart';
import SingupForm from '../components/SingupForm';
import Admin from '../pages/Admin';

import ManageCategory from '../components/admin-components/ManageCategory';
import ManageProducts from '../components/admin-components/ManageProducts';
import ManageOrders from '../components/admin-components/ManageOrders';
import Error from '../pages/Error';
import Login from '../components/Login';
import AdminRouting from './AdminRouting';
import ManageUsers from '../components/admin-components/ManageUsers';
import AdminProfile from '../components/admin-components/Profile';
import ActivateUser from '../pages/ActivatePage';
import ActivatePage from '../pages/ActivatePage';
import AddNewProducts from '../components/admin-components/AddnewProducts';
import ForgetPassword from '../pages/ForgetPassword';
import RestPassword from '../pages/RestPassword';


function IndexRouting() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:slug' element={<ProductDetails />} />
                <Route path='/singup' element={<SingupForm />} />
                <Route path='/users/activate/:token' element={<ActivatePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='users/forget-password' element={<ForgetPassword />} />
                <Route path='users/rest-password/:token' element={<RestPassword />} />
                <Route path='/cart' element={<Cart />} />

                <Route path="/dashboard" element={<AdminRouting />}>
                    <Route path="/dashboard/admin" element={<Admin />} />
                    <Route path="/dashboard/admin/categories" element={<ManageCategory />} />
                    <Route path="/dashboard/admin/products" element={<ManageProducts />} />
                    <Route path="/dashboard/admin/users" element={<ManageUsers />} />
                    <Route path="/dashboard/admin/orders" element={<ManageOrders />} />
                    <Route path="/dashboard/admin/addpoduct" element={<AddNewProducts />} />
                    <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
                </Route>

                <Route path="/*" element={<Error />} />

            </Routes>
        </BrowserRouter >
    )
}

export default IndexRouting
