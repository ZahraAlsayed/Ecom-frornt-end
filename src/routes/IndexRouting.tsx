/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDitails from '../pages/ProductDitails';
import Cart from '../components/Cart';
import SingupForm from '../components/SingupForm';
import UserProfile from '../components/UserProfile';
import ShoopingCart from '../components/ShoopingCart';
import Admin from '../pages/Admin';

import ProductsManager from '../components/ProductsManager';
import ManageCategory from '../components/admin-components/ManageCategory';
import ManageProducts from '../components/admin-components/ManageProducts';
import ManageUers from '../components/admin-components/ManageUsres';
import ManageOrders from '../components/admin-components/ManageOrders';
import Error from '../pages/Error';
import AddNewProducts from '../components/admin-components/AddnewProducts';

function IndexRouting() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<ProductDitails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<SingupForm />} />


                <Route path='/user/user-profile' element={<UserProfile />} />
                {/* <Route path='/user/shoopingcart' element={<ShoopingCart />} /> */}


                <Route path='/dashboard' element={<Admin />} />
                <Route path='/dashboard/admin/categories' element={<ManageCategory />} />
                <Route path='/dashboard/admin/products' element={<ManageProducts />} />
                <Route path='/dashboard/admin/usres' element={<ManageUers />} />
                <Route path='/dashboard/admin/orders' element={<ManageOrders />} />
                <Route path='/dashboard/admin/add' element={<AddNewProducts />} />

                <Route path="*" element={<Error />} />






            </Routes>
        </BrowserRouter>
    )
}

export default IndexRouting
