import React from 'react';

const ContactUs = () => {
    document.title = "TradeHub - Contact Us";
    window.scrollTo(0, 0);
    return (
        <main className="container mx-auto px-4 py-6">
            <section className="bg-white shadow rounded p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="mb-4">
                    If you have any issues, questions, or need more information, please fill out the form below or contact us directly using the information provided.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Form */}
                    <div>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                                <input type="text" id="name" name="name" className="border rounded px-4 py-2 w-full" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                                <input type="email" id="email" name="email" className="border rounded px-4 py-2 w-full" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700">Message</label>
                                <textarea id="message" name="message" className="border rounded px-4 py-2 w-full" rows="4" required></textarea>
                            </div>
                            <div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Our Address</h3>
                            <p className="text-gray-700">123 TradeHub Street, Business City, BC 12345</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Phone</h3>
                            <p className="text-gray-700">+1 (234) 567-890</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p className="text-gray-700">support@tradehub.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactUs;
