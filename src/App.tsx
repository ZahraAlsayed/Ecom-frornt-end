/* eslint-disable prettier/prettier */
//import { ProductsManager } from './components/ProductsManager'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Product from './pages/Product';
import Categories from './components/Categories';
import Products from './components/Products';
import UserList from './components/UsersList';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path='/dashboard' element={<Admin />} />
          <Route path='/dashboard/admin/categories' element={<Categories />} />
          <Route path='/dashboard/admin/products' element={<Products />} />
          <Route path='/dashboard/admin/usres' element={<UserList />} />




        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
