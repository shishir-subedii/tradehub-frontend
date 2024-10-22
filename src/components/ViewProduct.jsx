import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import { CartContext } from '../context/CartContext';

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartData, setCartData] = useContext(CartContext);
  const navigate = useNavigate();
  document.title = "TradeHub - view product";
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/product/${productId}`);
        setProduct(response.data.message);
      } catch (error) {
        console.error('Error fetching the product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    document.title = product ? `TradeHub - ${product.name}` : 'TradeHub - Loading...';
  }, [product]);

  const handleImageChange = (src) => {
    document.getElementById('mainImage').src = src;
  };

  const leftScroll = () => {
    document.getElementById('thumbnailContainer').scrollBy({ left: -100, behavior: 'smooth' });
  };

  const rightScroll = () => {
    document.getElementById('thumbnailContainer').scrollBy({ left: 100, behavior: 'smooth' });
  };

  const addToCart = () => {
    if (!sessionStorage.getItem('token')) {
      return toast.error('You must be logged in to add products to cart', {
        autoClose: 3000,
      });
    }
    try {
      const productToAdd = {
        Name: product.name,
        Quantity: quantity,
        Seller: product.seller,
        Image: product.images[0],
        ProductId: productId,
        Price: parseInt(product.price) * parseInt(quantity),
      };
      setCartData([...cartData, productToAdd]);
      setTimeout(() => {
        navigate('/all-products');
      }, 1000);
      toast.success('Product added to cart', {
        autoClose: 1000,
      });
      console.log(cartData);
    } catch (error) {
      toast.error('Error adding product to cart', {
        autoClose: 3000,
      });
    }
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100">
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/2">
          <img id="mainImage" src={product.images[0]} alt="Product Image" className="w-full h-auto rounded-lg mb-4 md:mb-0 hover-effect" />
          <div className="relative flex items-center">
            <button onClick={leftScroll} className="absolute left-0 bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400 transition duration-300 hover-effect">{'<'}</button>
            <div id="thumbnailContainer" className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {product.images.map((image, index) => (
                <img key={index} src={image} alt="Thumbnail" className="w-24 m-1 h-24 object-cover rounded-lg cursor-pointer hover-effect" onClick={() => handleImageChange(image)} />
              ))}
            </div>
            <button onClick={rightScroll} className="absolute right-0 bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400 transition duration-300 hover-effect">{'>'}</button>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold hover-effect">{product.name}</h1>
          <p className="text-xl text-blue-500 mt-2 hover-effect">${product.price}</p>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Product Description</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Quantity: {product.quantity}</li>
              <li>Category: {product.category}</li>
            </ul>
          </div>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Options</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Size</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 hover-effect">Add to Wishlist</button>
            <button onClick={addToCart} className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 hover-effect">Add to Cart</button>
          </div>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Ratings</h3>
            {product.ratings.length ? (
              <ul className="list-disc list-inside text-gray-700">
                {product.ratings.map((rating, index) => (
                  <li key={index}>{rating}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No ratings yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
