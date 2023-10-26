/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
'@mui/x-data-grid';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import Header from '../components/Header'
import Siadbar from './AdminSidbar';
import { fechUsers } from '../redux/slices/userslices/userSlice';
import { fechCategories } from '../redux/slices/products/categorySlice';
import { fechOrders } from '../redux/slices/userslices/orderSlice';

const Categories = () => {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const categories = state.categories


    useEffect(() => {
        dispatch(fechCategories())
    }
        , [])


    /**
    * If you want to keep things simple you can follow this approach on updating
    * redux state when using async requests instead of using createAsyncThunk
    */
    if (categories.isLoading) {
        return <p>loding ...</p>
    }
    if (categories.error) {
        return <p>{categories.error}</p>
    }

    return (
        <div >
            <div>
                <Siadbar />
            </div>
            <div className="card grid gap-4">
                <ul>
                    {categories.items.map((category) => (
                        <li key={category.id} className="flex items-center gap-4 text-2xl mb-2">
                            <span>{category.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}
export default Categories
