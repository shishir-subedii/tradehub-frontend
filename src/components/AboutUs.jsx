import React, { useEffect } from 'react';
import person1 from '../assets/person-1.png';
import person2 from '../assets/person-2.jpg';
import person3 from '../assets/person-3.webp';


const AboutUs = () => {
    document.title = 'TradeHub - About Us';
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main className="container mx-auto px-4 py-6">
            <section className="bg-white shadow rounded p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">About Us</h2>
                <p className="mb-4">
                    Welcome to TradeHub! We are passionate about connecting buyers and sellers in a seamless and efficient marketplace. Our mission is to provide a platform where users can find the best products and services with ease.
                </p>

                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="mb-4">
                    Our mission is to empower individuals and businesses by providing a reliable and user-friendly platform for trading goods and services. We strive to create a community where trust and transparency are paramount.
                </p>

                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="mb-4">
                    Our vision is to become the leading marketplace platform, known for its innovation, customer satisfaction, and commitment to excellence. We aim to continuously improve and adapt to the changing needs of our users.
                </p>

                <h3 className="text-xl font-semibold mb-2">Meet Our Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-100 p-4 rounded shadow">
                        <img src={person1} alt="Team Member" className="w-full h-32 object-cover mb-4 rounded" />
                        <h4 className="text-lg font-semibold">John Doe</h4>
                        <p className="text-gray-700">Founder & CEO</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded shadow">
                        <img src={person2} alt="Team Member" className="w-full h-32 object-cover mb-4 rounded" />
                        <h4 className="text-lg font-semibold">Jane Smith</h4>
                        <p className="text-gray-700">Chief Marketing Officer</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded shadow">
                        <img src={person3} alt="Team Member" className="w-full h-32 object-cover mb-4 rounded" />
                        <h4 className="text-lg font-semibold">Emily Johnson</h4>
                        <p className="text-gray-700">Head of Product</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">Disclaimer</h3>
                <p className="mb-4">
                    This website is a hobby project. It is not a professional project, so please do not provide your actual information to anyone apart from your email address while signing in.
                </p>
            </section>
        </main>
    );
};

export default AboutUs;
