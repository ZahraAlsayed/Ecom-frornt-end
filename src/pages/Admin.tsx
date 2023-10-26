/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import AdminSidebar from '../components/AdminSidbar';
import '../App.css'

const Admin = () => {


    return (
        <div >
            <div className="dashboard">
                <AdminSidebar />
                <main className="content">

                </main>
            </div>
            <Footer />
        </div>
    )
}
export default Admin
