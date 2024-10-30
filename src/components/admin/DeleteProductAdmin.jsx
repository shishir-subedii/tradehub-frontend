import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const DeleteProductAdmin = () => {
    const [productId, setProductId] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setProductId(e.target.value);
    };

    document.title = "TradeHub - Delete Product";

    useEffect(()=>{
        if(!sessionStorage.getItem('token') || !sessionStorage.getItem('isAdmin')) {
            navigate('/login');
        }
    })

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-product/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            if (response.data.success) {
                toast.success('Product deleted successfully', { autoClose: 3000 });
                setProductId('');
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error deleting product', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-2/3 p-4 flex items-center justify-center">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Delete Product</h2>
                <form onSubmit={handleDeleteProduct}>
                    <div className="mb-4">
                        <label htmlFor="productId" className="block text-gray-700">Product ID</label>
                        <input
                            type="text"
                            id="productId"
                            value={productId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 hover:shadow-lg transition duration-300"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : 'Delete Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeleteProductAdmin;
