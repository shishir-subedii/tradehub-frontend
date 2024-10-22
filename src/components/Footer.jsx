import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <Link to='/about-us' className="text-lg font-semibold">About Us</Link>
                    <p className="mt-2 text-gray-400">
                        TradeHub helps people buy and sell easily and safely. Created by:{' '}
                        <a className="text-blue-500" href="https://github.com/shishir-subedii">
                            Shishir Subedi
                        </a>
                    </p>
                </div>
                <div>
                    <Link to='/contact-us' className="text-lg font-semibold">Contact Us</Link>
                    <p className="mt-2 text-gray-400">Email: info@tradehub.com</p>
                    <p className="mt-2 text-gray-400">Phone: +123 456 7890</p>
                </div>
                <div>
                    <Link to='/terms-and-conditions' className="text-lg font-semibold">Terms & Conditions</Link>
                    <p className="mt-2 text-gray-400">
                       Please read our terms and conditions carefully before using our website.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="mt-2 flex space-x-4">
                        <Link to='.' className="text-gray-400 hover:text-white">
                            Facebook
                        </Link>
                        <Link to='.' className="text-gray-400 hover:text-white">
                            Twitter
                        </Link>
                        <Link to='.' className="text-gray-400 hover:text-white">
                            Instagram
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
