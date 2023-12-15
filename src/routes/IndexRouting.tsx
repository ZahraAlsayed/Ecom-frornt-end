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
import AddNewProducts from '../components/admin-components/AddnewProducts';
import Login from '../components/Login';
import AdminRouting from './AdminRouting';
import ManageUsers from '../components/admin-components/ManageUsers';
import AdminProfile from '../components/admin-components/Profile';


function IndexRouting() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/singup' element={<SingupForm />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cart' element={<Cart />} />


                {/* <Route path="/dashboard" element={<AdminRouting />}> */}
                    <Route path="/dashboard/admin" element={<Admin />} />
                    <Route path="/dashboard/admin/categories" element={<ManageCategory />} />
                    <Route path="/dashboard/admin/products" element={<ManageProducts />} />
                    <Route path="/dashboard/admin/users" element={<ManageUsers />} />
                    <Route path="/dashboard/admin/orders" element={<ManageOrders />} />
                    <Route path="/dashboard/admin/addpoduct" element={<AddNewProducts />} />
                    <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
                {/* </Route> */}

                <Route path="/*" element={<Error />} />

            </Routes>
        </BrowserRouter >
    )
}

export default IndexRouting
