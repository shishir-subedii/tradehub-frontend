import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty'];

    document.title = "TradeHub - Create Product";
    window.scrollTo(0, 0);

    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            window.location.href = '/login';
        }
    })

    const handleTagsChange = (e) => {
        setTags(e.target.value.split(','));
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('quantity', quantity);
        tags.forEach(tag => formData.append('tags', tag));
        images.forEach(image => formData.append('images', image));

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/create-product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': sessionStorage.getItem('token')
                }
            });
            if (response.data.success) {
                toast.success('Product created successfully', { autoClose: 3000 });
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setQuantity('');
                setTags([]);
                setImages([]);
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Error creating product', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <ToastContainer />
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Create Product</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 mb-2">Price</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 mb-2">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required>
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-gray-700 mb-2">Tags</label>
                        <input type="text" id="tags" value={tags.join(',')} onChange={handleTagsChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" placeholder="Comma separated tags" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="block text-gray-700 mb-2">Images (Select Multiple images at once if you like)</label>
                        <input type="file" id="images" onChange={handleImageChange} multiple className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        {loading ? <Loading /> : 'Create Product'}
                        </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
