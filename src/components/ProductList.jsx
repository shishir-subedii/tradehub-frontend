import React from 'react';

const ProductList = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-6xl p-4">
                {/* Search Bar */}
                <div className="flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition-all duration-300">
                        Search
                    </button>
                </div>
                {/* Filter Section and Search Results */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">Search results for 'xyz'</p>
                    <button
                        id="filterToggle"
                        className="lg:hidden bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                        onClick={() => {
                            const filterSection = document.getElementById('filterSection');
                            filterSection.classList.toggle('hidden');
                        }}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex">
                    {/* Filter Section */}
                    <div
                        id="filterSection"
                        className="hidden mt-8 lg:mt-0 lg:block w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-lg fixed inset-0 lg:relative lg:inset-auto lg:flex lg:h-1/2 lg:flex-col lg:space-y-4 z-40"
                    >
                        <button
                            id="filterClose"
                            className="lg:hidden bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300 self-end"
                            onClick={() => {
                                const filterSection = document.getElementById('filterSection');
                                filterSection.classList.add('hidden');
                            }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>
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
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center hover:shadow-xl transition-all duration-300">
                                <img
                                    src="./bg.jpg"
                                    alt="Product Image"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="ml-4 flex-1">
                                    <Link to="/product/123" className="text-lg font-semibold text-black hover:underline">
                                        Product Title
                                    </Link>
                                    <p className="text-gray-600">
                                        This is a brief description of the product. It provides key details and
                                        features.
                                    </p>
                                    <p className="text-gray-800 font-bold mt-2">$99.99</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center hover:shadow-xl transition-all duration-300">
                                <img
                                    src="./bg.jpg"
                                    alt="Product Image"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="ml-4 flex-1">
                                    <Link to="/product/123" className="text-lg font-semibold text-black hover:underline">
                                        Product Title
                                    </Link>
                                    <p className="text-gray-600">
                                        This is a brief description of the product. It provides key details and
                                        features.
                                    </p>
                                    <p className="text-gray-800 font-bold mt-2">$99.99</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center hover:shadow-xl transition-all duration-300">
                                <img
                                    src="./bg.jpg"
                                    alt="Product Image"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="ml-4 flex-1">
                                    <Link to="/product/123" className="text-lg font-semibold text-black hover:underline">
                                        Product Title
                                    </Link>
                                    <p className="text-gray-600">
                                        This is a brief description of the product. It provides key details and
                                        features.
                                    </p>
                                    <p className="text-gray-800 font-bold mt-2">$99.99</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center hover:shadow-xl transition-all duration-300">
                                <img
                                    src="./bg.jpg"
                                    alt="Product Image"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="ml-4 flex-1">
                                    <Link to="/product/123" className="text-lg font-semibold text-black hover:underline">
                                        Product Title
                                    </Link>
                                    <p className="text-gray-600">
                                        This is a brief description of the product. It provides key details and
                                        features.
                                    </p>
                                    <p className="text-gray-800 font-bold mt-2">$99.99</p>
                                </div>
                            </div>
                            {/* Repeat the product row for more products */}
                        </div>
                        {/* Pagination Controls */}
                        <div className="mt-6 flex justify-between items-center">
                            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300">
                                Previous
                            </button>
                            <div className="flex space-x-2">
                                <button className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300">
                                    1
                                </button>
                                <button className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300">
                                    2
                                </button>
                                <button className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300">
                                    3
                                </button>
                            </div>
                            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
