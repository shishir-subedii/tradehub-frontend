import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    document.title = "TradeHub - 404 Page Not Found";

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</p>
                <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
                <NavLink to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go to Homepage
                </NavLink>
            </div>
        </div>
    );
};

export default NotFound;
