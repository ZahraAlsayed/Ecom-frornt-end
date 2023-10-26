/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link className='text' to='/dashboard/admin/categories'> Mange Categories</Link>

                </li>
                <li>
                    <Link className='text' to='/dashboard/admin/products'> Mange Products</Link>
                </li>
                <li>
                    <Link className='text' to='/dashboard/admin/usres'> Mange Usres</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
