import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        tags: '',
        category: '',
    });
    const [loading, setLoading] = useState(true);
    const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty'];
    document.title = "TradeHub - Update Product";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/product/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                if (response.data.success) {
                    const { name, description, price, quantity, tags, category } = response.data.message;
                    setProductDetails({ name, description, price, quantity, tags, category });
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Error fetching product details', { autoClose: 3000 });
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/products/update-product/${id}`, productDetails, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            if (response.data.success) {
                setTimeout(() => {
                    navigate('/seller/get-all-products');
                }, 1000);
                toast.success('Product updated successfully', { autoClose: 1000 });
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error updating product', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            navigate('/login');
        }
    })

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <ToastContainer />
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Update Product</h1>
                {loading ? (
                    <Loading />
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={productDetails.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={productDetails.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700 mb-2">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={productDetails.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-gray-700 mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={productDetails.quantity}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tags" className="block text-gray-700 mb-2">
                                Tags
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={productDetails.tags}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={productDetails.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                required
                            >
                                <option value="">Select a Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Update Product
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateProduct;
