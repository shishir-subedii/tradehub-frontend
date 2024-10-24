import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    document.title = "TradeHub - Privacy Policy";
    //scroll to top
    useEffect(() => { 
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-gray-100">
            <main className="container mx-auto px-4 py-6">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                    <p className="mb-4">
                        Welcome to TradeHub! This Privacy Policy outlines how we collect, use, and protect your
                        personal information when you use our website.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">1. Data Collection</h3>
                    <p className="mb-4">
                        We collect personal information that you provide to us directly, such as your name, email
                        address, and any other information you choose to provide. We also collect information automatically
                        through your use of our website, such as IP addresses, browser types, and usage data.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">2. Data Usage</h3>
                    <p className="mb-4">
                        We use your personal information to provide and improve our services, communicate with you,
                        and ensure the security of our website. We may also use your information for marketing purposes,
                        with your consent.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">3. Data Sharing</h3>
                    <p className="mb-4">
                        We do not sell your personal information to third parties. We may share your information
                        with service providers who assist us in operating our website and providing our services, as well as
                        with legal authorities if required by law.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">4. Data Security</h3>
                    <p className="mb-4">
                        We implement appropriate security measures to protect your personal information from
                        unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over
                        the internet or electronic storage is completely secure.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">5. User Rights</h3>
                    <p className="mb-4">
                        You have the right to access, correct, or delete your personal information. You may also
                        object to the processing of your data or request data portability. To exercise these rights, please
                        contact us at [email address].
                    </p>

                    <h3 className="text-xl font-semibold mb-2">6. Changes to this Policy</h3>
                    <p className="mb-4">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by
                        posting the new policy on our website. You are advised to review this policy periodically for any
                        changes.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">7. Contact Us</h3>
                    <p className="mb-4">
                        If you have any questions or concerns about this Privacy Policy, please contact us at [email
                        address].
                    </p>

                    <h3 className="text-xl font-semibold mb-2">8. Hobby Project Disclaimer</h3>
                    <p className="mb-4">
                        This website is a hobby project. It is not a professional project, so please do not provide
                        your actual information to anyone apart from your email address. And you are not getting any real products or services from this website.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
