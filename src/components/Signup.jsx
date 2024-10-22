import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const Signup = () => {
    document.title = "TradeHub - Sign Up";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            toast.error('You must accept the terms and conditions', { autoClose: 3000 });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
                name,
                email,
                password
            });

            if (response.data.success) {
                sessionStorage.setItem('verifyEmail', email);
                toast.success('Signup successful. Please verify OTP!', { autoClose: 1000 });
                setTimeout(() => {
                    navigate('/verify-otp');
                }, 1000);
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error signing up', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen m-1 mt-[-50px]">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up for TradeHub</h2>
                <form id="signupForm" onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                            required
                        />
                    </div>
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
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                            required
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
                        {loading ? <Loading /> : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <NavLink to="/login" className="text-black hover:underline">Log in</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;
