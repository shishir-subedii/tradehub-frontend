import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Loading from './Loading';

const Checkout = () => {
    const { seller } = useParams();
    const navigate = useNavigate();
    const [cartData, setCartData] = useContext(CartContext);
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });


    document.title = "TradeHub - Checkout";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    };

    const selectedProducts = cartData.filter(product => product.Seller === seller);

    const handlePlaceOrder = async () => {
        if (Object.values(shippingAddress).some(field => !field)) {
            toast.error('Please fill in all the shipping address fields.', { autoClose: 3000 });
            return;
        }

        const order = {
            products: selectedProducts.map(product => ({
                product: product.ProductId,
                quantity: product.Quantity,
            })),
            shippingAddress: shippingAddress,
        };

        setLoading(true);   
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/new-order`, order, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${sessionStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                toast.success('Order placed successfully', { autoClose: 3000 });
                setCartData(cartData.filter(product => product.Seller !== seller));
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error placing order', {
                autoClose: 3000
            });
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-gray-100">
            <ToastContainer />
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                {selectedProducts.length > 0 ? (
                    <>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

                            <div className="mb-4">
                                <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                                <input type="text" id="country" name="country" value={shippingAddress.country} onChange={handleAddressChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="state" className="block text-gray-700 mb-2">State / Province</label>
                                <input type="text" id="state" name="state" value={shippingAddress.state} onChange={handleAddressChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="postalCode" className="block text-gray-700 mb-2">Postal Code</label>
                                <input type="text" id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleAddressChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                                <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleAddressChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="street" className="block text-gray-700 mb-2">Street</label>
                                <input type="text" id="street" name="street" value={shippingAddress.street} onChange={handleAddressChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            <ul>
                                {selectedProducts.map((product, index) => (
                                    <li key={index} className="flex justify-between mb-4">
                                        <span>{product.Name}</span>
                                        <span>{product.Quantity} x ${product.Price}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg font-bold mb-2">Total Amount: ${selectedProducts.reduce((acc, item) => acc + item.Price, 0)}</p>
                            <p className="text-lg font-bold mb-4">Payment Method: COD</p>
                            <button onClick={handlePlaceOrder} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 hover-effect">{loading ? <Loading /> : 'Place Order'}</button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">No products to checkout.</p>
                )}
            </div>
        </div>
    );
};

export default Checkout;
