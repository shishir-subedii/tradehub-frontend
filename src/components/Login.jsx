import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const navigate = useNavigate();

    document.title = "TradeHub - Login";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!termsAccepted) {
            toast.error('You must accept the terms and conditions.', { autoClose: 3000 });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/`, { email, password });
            const { success, message } = response.data;

            if (success) {
                sessionStorage.setItem('token', message);
                if (success.isAdmin) {
                    sessionStorage.setItem('isAdmin', true);
                }
                toast.success('Login successful!', { autoClose: 1000 });
                setTimeout(() => {
                    navigate('/all-products');
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

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!forgotEmail) {
            toast.error('Please enter your email.', { autoClose: 3000 });
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, { email: forgotEmail });
            toast.success(response.data.message || 'Password reset sent to your email.', { autoClose: 3000 });
            sessionStorage.setItem('forgotEmail', forgotEmail);
            setTimeout(() => {
                
                navigate('/forgot-password');
            }, 1000);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'An error occurred. Please try again.', { autoClose: 3000 });
        } finally {
            setShowForgotPasswordModal(false);
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login to TradeHub</h2>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="form-checkbox h-5 w-5 text-black"
                            />
                            <span className="ml-2 text-gray-700">
                                I agree to the <NavLink to="/terms-and-conditions" className="text-black hover:underline">terms and conditions</NavLink>
                            </span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : 'Login'}
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    <button onClick={() => setShowForgotPasswordModal(true)} className="text-black hover:underline">Forgot your password?</button>
                </p>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <NavLink to="/signup" className="text-black hover:underline">Sign up</NavLink>
                </p>
            </div>

            {showForgotPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Forgot Password</h3>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className="mb-4">
                                <label htmlFor="forgotEmail" className="block text-gray-700">Enter your email:</label>
                                <input
                                    type="email"
                                    id="forgotEmail"
                                    name="forgotEmail"
                                    placeholder="Your Email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300"
                                    onClick={() => setShowForgotPasswordModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
