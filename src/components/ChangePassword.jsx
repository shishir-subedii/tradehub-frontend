import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    document.title = "TradeHub - Change Password";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get token from sessionStorage
    const token = sessionStorage.getItem('token');
    useEffect(() => {
    if (!token) {
        navigate('/login');
    }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/change-password`, {
                currentPassword,
                newPassword
            }, {
                headers: {
                   'token': token
                }
            });

            const { success, message } = response.data;

            if (success) {
                toast.success('Password changed successfully!', { autoClose: 1000 });
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
                
            } else {
                toast.error(message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'An error occurred. Please try again.', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
                <form id="changePasswordForm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-gray-700">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Enter Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
