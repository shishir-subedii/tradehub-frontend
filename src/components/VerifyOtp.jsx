import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const email = sessionStorage.getItem('verifyEmail');

    useEffect(()=>{
        if (!email) {
            navigate('/signup');
        }
    })
    document.title = "TradeHub - verify OTP";
    window.scrollTo(0, 0);
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`, {
                email,
                otp
            });

            if (response.data.success) {
                toast.success('OTP verified successfully', { autoClose: 1000 });
                
                setTimeout(() => {
                    navigate('/login'); // Navigate to the login page on successful OTP verification
                }, 1000);
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error verifying OTP', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>
                <form id="verifyOtpForm" onSubmit={handleVerifyOtp}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-700">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            placeholder="Enter your OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
