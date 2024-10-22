import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import laws from '../assets/48 laws.jpg'
import chair1 from '../assets/chair-1.jpeg'
import lipstick from '../assets/lipstick.jpg'
import nike from '../assets/nike-shoe.jpg'
import tv from '../assets/tv.jpg'
import af1 from '../assets/af-1.jpg'
import fridge from '../assets/fridge.webp'
import sofa from '../assets/sofa-1.jpg'
import trainer from '../assets/trainer-shoe.jpg'
import makeup from '../assets/makeup.jpg'
import table from '../assets/table.jpg'
import background1 from '../assets/background - 1.jpg'
import background2 from '../assets/background - 2.jpg'
import bg from '../assets/bg.jpg'
import bg1 from '../assets/bg1.jpg'

const Home = () => {
    // State to control hero slider
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [background1, background2, bg, bg1, background1, bg];
    const totalSlides = slides.length;

    document.title = "TradeHub - Home";
    window.scrollTo(0, 0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [totalSlides]);

    // Function to scroll the product or category sliders
    const scrollLeft = (id) => {
        document.getElementById(id).scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = (id) => {
        document.getElementById(id).scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="relative hero-slider">
                <div id="hero-slider" className="absolute inset-0">
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide}
                            alt={`Hero Image ${index + 1}`}
                            className={`w-full h-full object-cover ${index === currentSlide ? '' : 'hidden'}`}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold px-1">Welcome to TradeHub</h1>
                        <p className="text-center text-white-600 my-1">
                            Your ultimate marketplace for buying, selling, and exploring unique products with ease.
                        </p>
                        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"><Link to='/all-products'>Shop Now</Link> </button>
                    </div>
                </div>
            </section>

            {/* Product Slider */}
            <section className="my-8">
                <h2 className="text-2xl font-bold text-center mb-4">Featured Products</h2>
                <div className="relative">
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        onClick={() => scrollLeft('product-slider')}
                    >
                        ❮
                    </button>
                    <div id="product-slider" className="slider px-4 flex overflow-x-scroll">
                        {/* Product Cards */}
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={af1} alt="Product Image" className="w-full h-40 object-cover" />
                            <Link to='/product/6717a01a9a8c2c26da65b521' className="mt-2 text-lg font-semibold">Nike Af-1</Link>
                            <p className="text-gray-600">$199</p>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={sofa} alt="Product Image" className="w-full h-40 object-cover" />
                            <Link to='/product/6717a0bf9a8c2c26da65b52d' className="mt-2 text-lg font-semibold">Premium sofa</Link>
                            <p className="text-gray-600">$1299</p>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={fridge} alt="Product Image" className="w-full h-40 object-cover" />
                            <Link to='/product/6717a71a9a8c2c26da65b587' className="mt-2 text-lg font-semibold">Refrigerator</Link>
                            <p className="text-gray-600">$299</p>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={makeup} alt="Product Image" className="w-full h-40 object-cover" />
                            <Link to='/product/6717a81f9a8c2c26da65b5b4' className="mt-2 text-lg font-semibold">Make Up Kit</Link>
                            <p className="text-gray-600">$29</p>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={table} alt="Product Image" className="w-full h-40 object-cover" />
                            <Link to='/product/6717a6039a8c2c26da65b56d' className="mt-2 text-lg font-semibold">Wooden Table</Link>
                            <p className="text-gray-600">$49</p>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={trainer} alt="Product Image" className="w-full h-40 object-cover" />
                            <Link to='/product/6717a2c29a8c2c26da65b543' className="mt-2 text-lg font-semibold">Nike Trainers</Link>
                            <p className="text-gray-600">$99</p>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={af1} alt="Product Image" className="w-full h-40 object-cover" />
                            <Link to='/product/6717a01a9a8c2c26da65b521' className="mt-2 text-lg font-semibold">Nike Af-1</Link>
                            <p className="text-gray-600">$199</p>
                        </div>
                    </div>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        onClick={() => scrollRight('product-slider')}
                    >
                        ❯
                    </button>
                </div>
            </section>

            {/* Category Showcase */}
            <section className="my-8">
                <h2 className="text-2xl font-bold text-center mb-4">Shop by Category</h2>
                <div className="relative">
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        onClick={() => scrollLeft('category-slider')}
                    >
                        ❮
                    </button>
                    <div id="category-slider" className="slider px-4 flex overflow-x-scroll">
                        {/* Category Cards */}
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={`${chair1}`} alt="Category Image" className="w-full h-40 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold"><Link to={`/searchresults/Home`}>Home</Link></h3>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={`${laws}`} alt="Category Image" className="w-full h-40 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold"><Link to={`/searchresults/Books`}>Books</Link></h3>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={`${lipstick}`} alt="Category Image" className="w-full h-40 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold"><Link to={`/searchresults/Beauty`}>Beauty</Link></h3>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={`${tv}`} alt="Category Image" className="w-full h-40 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold"><Link to={`/searchresults/Electronics`}>Electronics</Link></h3>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={`${nike}`} alt="Category Image" className="w-full h-40 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold"><Link to={`/searchresults/Clothing`}>Clothing</Link></h3>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={`${chair1}`} alt="Category Image" className="w-full h-40 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold"><Link to={`/searchresults/Home`}>Home</Link></h3>
                        </div>
                        <div className="slider-item bg-white p-4 rounded-md shadow-md mb-2">
                            <img src={`${lipstick}`} alt="Category Image" className="w-full h-40 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold"><Link to={`/searchresults/Beauty`}>Beauty</Link></h3>
                        </div>

                    </div>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                        onClick={() => scrollRight('category-slider')}
                    >
                        ❯
                    </button>
                </div>
            </section>

            {/* Featured Products Grid */}
        </div>
    );
};

export default Home;

