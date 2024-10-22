import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';

const GetAllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    document.title = "TradeHub - All Orders";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/get-all-orders?page=${currentPage}&limit=5`, {
                    headers: { 'Content-Type': 'application/json', 'token': token }
                });
                if (response.data.success) {
                    setOrders(response.data.message);
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
        fetchOrders();
    }, [currentPage]);

    const handleMarkAsProcessing = async (orderId) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/mark-as-processing/${orderId}`, {}, {
                headers: { 'Content-Type': 'application/json', 'token': token }
            });
            if (response.data.success) {
                toast.success('Order marked as processing', { autoClose: 3000 });
                setOrders(orders.map(order => order._id === orderId ? { ...order, orderStatus: 'processing' } : order));
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error marking order as processing', { autoClose: 3000 });
        }
    };

    const handleCancelOrder = async (orderId) => {
        const confirmed = window.confirm('Are you sure you want to cancel this order?');
        if (confirmed) {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/cancel-order/${orderId}`, {}, {
                    headers: { 'Content-Type': 'application/json', 'token': token }
                });
                if (response.data.success) {
                    toast.success('Order cancelled successfully', { autoClose: 3000 });
                    setOrders(orders.filter(order => order._id !== orderId));
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Error cancelling order', { autoClose: 3000 });
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <ToastContainer />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">All Orders</h1>
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
                                    <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                                    <h3 className="font-semibold mt-2">Products:</h3>
                                    <ul className="list-disc ml-5">
                                        {order.products.map((product, index) => (
                                            <li key={index}>{product.product} - Quantity: {product.quantity}</li>
                                        ))}
                                    </ul>
                                    <div className="mt-4">
                                        {order.orderStatus === 'pending' && (
                                            <button onClick={() => handleMarkAsProcessing(order._id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mr-2">
                                                {loading ? <Loading /> : 'Mark as Processing'}
                                            </button>
                                        )}
                                        {order.orderStatus === 'pending' && (
                                            <button onClick={() => handleCancelOrder(order._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                                                {loading ? <Loading /> : 'Cancel Order'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )}
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button key={page} onClick={() => handlePageChange(page)} className={`mx-1 px-3 py-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                    {page}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GetAllOrders;
