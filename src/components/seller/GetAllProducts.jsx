import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';

const GetAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    document.title = "TradeHub - Products";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get-seller-products?page=${currentPage}&limit=5`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                if (response.data.success) {
                    setProducts(response.data.message.products);
                    setCurrentPage(response.data.message.currentPage);
                    setTotalPages(response.data.message.totalPages);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Error fetching products', { autoClose: 3000 });
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage]);

    const deleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/delete-product/${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                if (response.data.success) {
                    toast.success(response.data.message, { autoClose: 3000 });
                    setLoading(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Error deleting product', { autoClose: 3000 });
            }
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true);
    };

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
           navigate('/login');
        }
    }, []);
    
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <ToastContainer />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">All Products</h1>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
                                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Price:</strong> ${product.price}</p>
                                    <p><strong>Category:</strong> {product.category}</p>
                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                    <p><strong>Sold Count:</strong> {product.soldCount}</p>
                                    <div className="flex space-x-2 mt-2">
                                        {product.images.map((image, index) => (
                                            <img key={index} src={image} alt="Product" className="w-16 h-16 object-cover rounded-lg" />
                                        ))}
                                    </div>
                                    <Link to={`/seller/products/update/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-4 inline-block">
                                        Update Product
                                    </Link>
                                    <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 mx-2 rounded-lg hover:bg-red-600 transition duration-300 mt-4 inline-block">
                                        {loading ? <Loading /> : 'Delete Product'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No products found.</p>
                        )}
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`mx-1 px-3 py-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
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

export default GetAllProducts;
