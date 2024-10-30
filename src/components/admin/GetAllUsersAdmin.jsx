import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const GetAllUsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!sessionStorage.getItem('token') || !sessionStorage.getItem('isAdmin')) {
            navigate('/login');
        }
    }, []);

    document.title = "TradeHub - Admin Users";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/get-all-users?page=${currentPage}&limit=5`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                if (response.data.success) {
                    setUsers(response.data.data);
                    setCurrentPage(response.data.currentPage);
                    setTotalPages(response.data.totalPages);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            } catch (error) {
                toast.error('Error fetching users', { autoClose: 3000 });
            } finally {
                setLoading(false);
            }
        };

        if (!isSearching) {
            fetchUsers();
        }
    }, [currentPage, isSearching]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setLoading(true);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const token = sessionStorage.getItem('token');
            setLoading(true);
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            if (response.data.success) {
                toast.success(`User ${userId} deleted successfully!`, { autoClose: 3000 });
                setUsers(users.filter(user => user._id !== userId));
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error deleting user', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const handleSearchUsers = async () => {
        try {
            const token = sessionStorage.getItem('token');
            setLoading(true);
            setIsSearching(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/search-user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                params: {
                    searchKey: searchTerm
                }
            });
            if (response.data.success) {
                setUsers(response.data.data);
                setTotalPages(1);
                setCurrentPage(1);
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error searching users', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <ToastContainer />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">All Users</h1>
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users..."
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full max-w-md"
                    />
                    <button onClick={handleSearchUsers} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-2">
                        Search
                    </button>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user._id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
                                    <h2 className="text-lg font-semibold mb-2">User ID: {user._id}</h2>
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <div className="flex space-x-4 mt-4">
                                        <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                                            {loading ? <Loading /> : 'Delete User'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No users found.</p>
                        )}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="mx-1 px-3 py-1 rounded-lg bg-gray-200"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`mx-1 px-3 py-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="mx-1 px-3 py-1 rounded-lg bg-gray-200"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GetAllUsersAdmin;
