import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const SearchList = () => {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState(searchTerm);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    document.title = "TradeHub - search results";
    window.scrollTo(0, 0);

    useEffect(() => {
        fetchProducts();
    }, [searchTerm, currentPage]);

    const fetchProducts = async () => {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/products/search?page=${currentPage}&limit=5&searchKey=${search}`);
        const data = await response.json();
        if (data.success) {
            setProducts(data.message.products);
            setTotalPages(data.message.totalPages);
        }
        setLoading(false);
    };

    const changeSearch = () => {
        navigate(`/searchresults/${search}`);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-6xl p-4">
                {/* Search Bar */}
                <div className="flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        defaultValue={searchTerm}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-400 transition-all duration-300" onClick={changeSearch}>
                        Search
                    </button>
                </div>

                {/* Filter Section and Search Results */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">Search results for '{searchTerm}'</p>
                    <button
                        id="filterToggle"
                        className="lg:hidden bg-white text-black p-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
                        onClick={() => {
                            const filterSection = document.getElementById('filterSection');
                            filterSection.classList.toggle('hidden');
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                <div className="flex">
                    {/* Filter Section */}
                    <div
                        id="filterSection"
                        className="hidden mt-8 lg:mt-0 lg:h-1/2 lg:block w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-lg fixed inset-0 lg:relative lg:inset-auto lg:flex lg:flex-col lg:space-y-4 z-40"
                    >
                        <button
                            id="filterClose"
                            className="lg:hidden bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 self-end"
                            onClick={() => {
                                const filterSection = document.getElementById('filterSection');
                                filterSection.classList.add('hidden');
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input type="checkbox" className="mr-2" /> Under $50
                            <br />
                            <input type="checkbox" className="mr-2" /> $50 - $100
                            <br />
                            <input type="checkbox" className="mr-2" /> Over $100
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Size</label>
                            <input type="checkbox" className="mr-2" /> Small
                            <br />
                            <input type="checkbox" className="mr-2" /> Medium
                            <br />
                            <input type="checkbox" className="mr-2" /> Large
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Color</label>
                            <input type="checkbox" className="mr-2" /> Red
                            <br />
                            <input type="checkbox" className="mr-2" /> Blue
                            <br />
                            <input type="checkbox" className="mr-2" /> Green
                        </div>
                    </div>
                    {/* Product List */}
                    <div className="w-full lg:w-3/4 lg:ml-4">
                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="space-y-6">
                                {products.length==0?<>No products found</>: products.map((product) => (
                                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg flex items-center hover:shadow-xl transition-all duration-300">
                                        <img src={product.images[0]} alt="Product" className="w-24 h-24 object-cover rounded-lg" />
                                        <div className="ml-4 flex-1">
                                            <Link to={`/product/${product._id}`} className="text-lg font-semibold text-black hover:underline">
                                                {product.name}
                                            </Link>
                                            <p className="text-gray-600">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
                                            <p className="text-gray-800 font-bold mt-2">${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Pagination Controls */}
                        <div className="mt-6 flex justify-between items-center">
                            <button
                                className={`bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <div className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300 ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                className={`bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchList;
