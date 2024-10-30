import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';

const UpdateOrderAdmin = () => {
    const { id } = useParams();
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        if (!sessionStorage.getItem('token') || !sessionStorage.getItem('isAdmin')) {
            navigate('/login');
        }
    });

    document.title = "TradeHub - Update Order Status";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/update-order-status/${id}`, { status }, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            if (response.data.success) {
                toast.success('Order status updated successfully', { autoClose: 1000 });
                setTimeout(() => {
                    navigate('/admin/get-all-orders');
                }, 1000);
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error updating order status', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-3/5 p-4 flex items-center justify-center">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Update Order Status</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={handleStatusChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="processing">Processing</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 hover:shadow-lg transition duration-300"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : 'Update Status'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateOrderAdmin;
