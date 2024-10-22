import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [cartData, setCartData] = useContext(CartContext);
    const [selectedSeller, setSelectedSeller] = useState("");
    const navigate = useNavigate();

    // Group products by seller
    const groupedBySeller = cartData.reduce((acc, item) => {
        if (!acc[item.Seller]) {
            acc[item.Seller] = [];
        }
        acc[item.Seller].push(item);
        return acc;
    }, {});

    document.title = "TradeHub - Cart";
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            alert("You need to login first.");
            navigate('/login');
            return;
        }
    }, [navigate]);

    const handleSellerChange = (event) => {
        setSelectedSeller(event.target.value);
    };

    // Get products for the selected seller
    const selectedProducts = selectedSeller ? groupedBySeller[selectedSeller] : [];

    // Calculate the total price of the selected products
    const calculateTotal = () => {
        return selectedProducts.reduce((acc, item) => acc + item.Price, 0);
    };

    // Handle item removal and update cart
    const handleRemoveItem = (index) => {
        const productToRemove = selectedProducts[index];
        const newCartData = cartData.filter(item => item.ProductId !== productToRemove.ProductId);
        setCartData(newCartData);

        // Show a success message
        toast.success('Product removed from cart', {
            autoClose: 3000,
        });

        // If no products are left for the selected seller, clear the selected seller
        if (groupedBySeller[selectedSeller].length === 1) {
            setSelectedSeller("");
        }
    };

    // Handle quantity change and update cart
    const handleQuantityChange = (index, newQuantity) => {
        const productToUpdate = selectedProducts[index];
        const updatedCartData = cartData.map(item => {
            if (item.ProductId === productToUpdate.ProductId) {
                return { ...item, Quantity: newQuantity, Price: item.Price / item.Quantity * newQuantity };
            }
            return item;
        });
        setCartData(updatedCartData);
    };

    // Proceed to checkout
    const proceedToCheckout = () => {
        if (!selectedSeller) {
            toast.error('Please select a seller to proceed to checkout.', { autoClose: 3000 });
            return;
        }
        navigate(`/checkout/${selectedSeller}`);
    };

    return (
        <div className="bg-gray-100">
            <ToastContainer />
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                <div className="mb-4">
                    <label htmlFor="sellerSelect" className="block text-gray-700 mb-2">Select Seller</label>
                    <select id="sellerSelect" value={selectedSeller} onChange={handleSellerChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                        <option value="">-- Select Seller --</option>
                        {Object.keys(groupedBySeller).map((seller) => (
                            <option key={seller} value={seller}>
                                {seller}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedProducts.length > 0 ? (
                    <div>
                        {selectedProducts.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.Image} alt="Product Image" className="w-24 h-24 object-cover rounded-lg hover-effect" />
                                        <div>
                                            <h2 className="text-lg font-semibold hover-effect">{item.Name}</h2>
                                            <p className="text-gray-500">${item.Price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                        <div>
                                            <label htmlFor={`quantity-${index}`} className="block text-gray-700 mb-2">Quantity</label>
                                            <input type="number" id={`quantity-${index}`} min="1" value={item.Quantity} onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))} className="w-16 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                                        </div>
                                        <button onClick={() => handleRemoveItem(index)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 hover-effect">Remove</button>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <p className="text-gray-700">Subtotal: ${item.Price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="mb-4 md:mb-0">
                                    <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
                                    <p className="text-gray-500">Delivery Charge: $10.00</p>
                                    <p className="text-xl font-bold">Grand Total: ${calculateTotal() + 10}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <Link to='/all-products' className="text-blue-500 hover:underline hover-effect">Continue Shopping</Link>
                                    <button onClick={proceedToCheckout} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 hover-effect">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No products in the cart for the selected seller.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
