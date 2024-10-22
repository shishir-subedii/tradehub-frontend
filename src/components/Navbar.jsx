import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const suggestions = ['house', 'land', 'watch', 'shoe', 'rolex watch', 'car', 'laptop', 'phone', 'jacket', 'hat', 'bike', 'camera', 'tablet', 'sofa', 'lamp', 'desk', 'bed', 'fan', 'heater', 'microwave', 'oven', 'fridge', 'freezer', 'treadmill', 'speaker'];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartData, setCartData] = useContext(CartContext);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const goToSearchResults = (term) => {
        if (!term) return;
        navigate(`/searchresults/${term}`);
        setSearchTerm('');
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsModalOpen(!!e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setIsModalOpen(false);
        goToSearchResults(suggestion);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsModalOpen(false);
        }
    };

    const handleLogOut = () => {
        sessionStorage.removeItem('token');
        setCartData([]);
        navigate('/login');
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <NavLink to="/" className="text-2xl font-bold">TradeHub</NavLink>
                <div className="hidden lg:flex items-center space-x-4">
                    <div ref={searchRef} className="relative">
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="px-4 py-2 border rounded-md custom-placeholder" />
                        {isModalOpen && (
                            <div className="absolute bg-white border mt-2 rounded-md w-full max-h-40 overflow-y-auto">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="px-4 py-2 navbar-button" onClick={() => goToSearchResults(searchTerm)}>Search</button>
                    <NavLink to="/all-products" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Products</NavLink>
                    {
                        sessionStorage.getItem('token') ? <>
                            <NavLink to="/login" onClick={()=>handleLogOut()} className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Log Out</NavLink>
                            <NavLink to="/my-orders" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Myorders</NavLink>
                        </> :
                            <>
                                <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Login</NavLink>
                                <NavLink to="/signup" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Signup</NavLink>
                            </>
                    }
                    <NavLink to="/my-cart" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Cart({cartData.length})</NavLink>
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-2xl">☰</button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden flex flex-col items-center space-y-2">
                    <div ref={searchRef} className="relative w-full px-4">
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="px-4 py-2 border rounded-md custom-placeholder w-full" />
                        {isModalOpen && (
                            <div className="absolute bg-white border mt-2 rounded-md w-full max-h-40 overflow-y-auto">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="px-4 py-2 navbar-button" onClick={() => goToSearchResults(searchTerm)}>Search</button>
                    <NavLink to="/all-products" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Products</NavLink>
                    {
                        sessionStorage.getItem('token') ? <>
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Log Out</NavLink>
                            <NavLink to="/my-orders" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Myorders</NavLink>
                        </> :
                            <>
                                <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Login</NavLink>
                                <NavLink to="/signup" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Signup</NavLink>
                            </>
                    }

                    <NavLink to="/my-cart" className={({ isActive }) => isActive ? 'navbar-button navbar-active' : 'navbar-button'}>Cart({cartData.length})</NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
