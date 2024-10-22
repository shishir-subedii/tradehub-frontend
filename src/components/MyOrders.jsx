import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    document.title = "TradeHub - My Orders";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/user-orders?page=${page}&limit=5`, {
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                });
                if (response.data.success) {
                    setOrders(response.data.data);
                    setTotalPages(response.data.totalPages);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Error fetching orders', { autoClose: 3000 });
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            window.location.href = '/login';
        }
    })

    return (
        <div className="bg-gray-100 min-h-screen">
            <ToastContainer />
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">My Orders</h1>
                <p>Go to: <Link className='text-blue-700' to='/seller/dashboard'>Seller Dashboard</Link></p>
                <p>Go to: <Link className='text-blue-700' to='/change-password'>Change Password</Link></p>
                {loading ? (
                    <Loading/>
                ) : orders.length > 0 ? (
                    <>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            {orders.map(order => (
                                <div key={order._id} className="border-b pb-4 mb-4">
                                    <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                                    <p className="text-gray-700 mb-2">Total Amount: ${order.totalAmount}</p>
                                    <p className="text-gray-700 mb-2">Payment Status: {order.paymentStatus}</p>
                                    <p className="text-gray-700 mb-2">Order Status: {order.orderStatus}</p>
                                    <p className="text-gray-700 mb-2">Shipping Address: {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                                    <h3 className="font-semibold mb-2">Products:</h3>
                                    <ul>
                                        {order.products.map((product, index) => (
                                            <li key={index} className="text-gray-700">- Product ID: {product.product}, Quantity: {product.quantity}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button disabled={page === 1} onClick={() => handlePageChange(page - 1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 hover-effect">Previous</button>
                            <span>Page {page} of {totalPages}</span>
                            <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 hover-effect">Next</button>
                        </div>
                    </>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
