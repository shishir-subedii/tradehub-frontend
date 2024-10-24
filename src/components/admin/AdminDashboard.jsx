import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    useEffect(() => {
        if (!sessionStorage.getItem('token') || !sessionStorage.getItem("isAdmin")) {
            window.location.href = '/login';
        }
    })
    document.title = "TradeHub - Admin Dashboard";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/admin/delete-product" className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition duration-300 text-center">
                        Delete Product
                    </Link>
                    <Link to="/admin/get-all-orders" className="bg-yellow-500 text-white py-4 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 text-center">
                        Get All Orders
                    </Link>
                    <Link to="/admin/get-all-users" className="bg-yellow-500 text-white py-4 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 text-center">
                        Get All Users
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
