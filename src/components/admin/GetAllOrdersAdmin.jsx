import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';

const GetAllOrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(()=>{
        if(!sessionStorage.getItem('token') || !sessionStorage.getItem('isAdmin')) {
            window.location.href = '/login';
        }
    })
    document.title = "TradeHub - Admin Orders";

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/get-all-orders?page=${currentPage}&limit=5`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                if (response.data.success) {
                    setOrders(response.data.data);
                    setCurrentPage(response.data.currentPage);
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

        if (!isSearching) {
            fetchOrders();
        }
    }, [currentPage, isSearching]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setLoading(true);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const token = sessionStorage.getItem('token');
            setLoading(true);
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/cancel-order/${orderId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            if (response.data.success) {
                toast.success(`Order ${orderId} canceled successfully!`, { autoClose: 3000 });
                setOrders(orders.filter(order => order._id !== orderId));
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error canceling order', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const handleSearchOrders = async () => {
        try {
            const token = sessionStorage.getItem('token');
            setLoading(true);
            setIsSearching(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/search-order`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                params: {
                    searchKey: searchTerm
                }
            });
            if (response.data.success) {
                setOrders(response.data.data);
                setTotalPages(1);
                setCurrentPage(1);
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error searching orders', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <ToastContainer />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">All Orders</h1>
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search orders..."
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full max-w-md"
                    />
                    <button onClick={handleSearchOrders} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-2">
                       Search
                    </button>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
                                    <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
                                    <p><strong>Shipping Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                                    <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                                    <div className="flex space-x-4 mt-4">
                                        <button onClick={() => handleCancelOrder(order._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                                            {loading ? <Loading /> : 'Cancel Order'}
                                        </button>
                                        <Link to={`/admin/update-order/${order._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                                            Update Order
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="mx-1 px-3 py-1 rounded-lg bg-gray-200"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`mx-1 px-3 py-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="mx-1 px-3 py-1 rounded-lg bg-gray-200"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GetAllOrdersAdmin;
