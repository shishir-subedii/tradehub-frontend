import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'; // Assuming you have a Loading component

const AllProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    document.title = "TradeHub - All Products"; 
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch products from backend
    const fetchProducts = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get-all-products?page=${page}&limit=5`);
            if (data.success) {
                setProducts(data.message.products);
                setCurrentPage(data.message.currentPage);
                setTotalPages(data.message.totalPages);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
            window.scrollTo(0, 0); // Scroll to top when page changes
        }
    }, []);

    // Trigger product fetch on component mount or page change
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, fetchProducts]);

    // Memoize the product list to avoid unnecessary re-renders
    const renderedProducts = useMemo(() => products.map(product => (
        <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg flex items-center hover:shadow-xl transition-all duration-300">
            <Link to={`/product/${product._id}`}><img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded-lg" loading="lazy" /> </Link>
            <div className="ml-4 flex-1">
                <Link to={`/product/${product._id}`} className="text-lg font-semibold text-black hover:underline">{product.name}</Link>
                <p className="text-gray-600">{product.description.length > 120 ? `${product.description.substring(0, 120)}...` : product.description}</p>
                <p className="text-gray-800 font-bold mt-2">${product.price.toFixed(2)}</p>
                </div> 
        </div>
    )), [products]);

    // Handle search functionality
    const goToSearchResults = useCallback(() => {
        navigate(`/searchresults/${searchTerm}`);
        setSearchTerm('');
    }, [searchTerm, navigate]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-6xl p-4">
                {/* Search Bar */}
                <div className="flex items-center mb-6">
                    <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" placeholder="Search products..." className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300" />
                    <button className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition-all duration-300" onClick={goToSearchResults}>
                        Search
                    </button>
                </div>

                {/* Filter Section and Search Results */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">All Products</p>
                    <button id="filterToggle" className="lg:hidden bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300" onClick={() => document.getElementById('filterSection').classList.toggle('hidden')}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                <div className="flex">
                    {/* Filter Section */}
                    <div id="filterSection" className="hidden mt-8 lg:h-1/2 lg:mt-0 lg:block w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-lg fixed inset-0 lg:relative lg:inset-auto lg:flex lg:flex-col lg:space-y-4 z-40">
                        <button id="filterClose" className="lg:hidden bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 self-end" onClick={() => document.getElementById('filterSection').classList.add('hidden')}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Filters <p>Not working</p></h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input type="checkbox" className="mr-2" /> Under $50<br />
                            <input type="checkbox" className="mr-2" /> $50 - $100<br />
                            <input type="checkbox" className="mr-2" /> Over $100
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Size</label>
                            <input type="checkbox" className="mr-2" /> Small<br />
                            <input type="checkbox" className="mr-2" /> Medium<br />
                            <input type="checkbox" className="mr-2" /> Large
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Color</label>
                            <input type="checkbox" className="mr-2" /> Red<br />
                            <input type="checkbox" className="mr-2" /> Blue<br />
                            <input type="checkbox" className="mr-2" /> Green
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="w-full lg:w-3/4 lg:ml-4">
                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="space-y-6">
                                {renderedProducts.length ? renderedProducts : <p>No products found.</p>}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        <div className="mt-6 flex justify-between items-center">
                            <button disabled={currentPage === 1} className={`py-2 px-4 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-600' : 'bg-black text-white hover:bg-gray-800'} transition-all duration-300`} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                Previous
                            </button>
                            <div className="flex space-x-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button key={i} className={`py-2 px-4 rounded-lg ${i + 1 === currentPage ? 'bg-black text-white' : 'bg-gray-200 text-black hover:bg-gray-300'} transition-all duration-300`} onClick={() => setCurrentPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button disabled={currentPage === totalPages} className={`py-2 px-4 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-600' : 'bg-black text-white hover:bg-gray-800'} transition-all duration-300`} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
