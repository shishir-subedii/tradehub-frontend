import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 
    document.title = "TradeHub - Terms and Conditions";
    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="container mx-auto px-4 py-6">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
                    <p className="mb-4">Welcome to TradeHub! These terms and conditions outline the rules and regulations for the use of TradeHub's Website.</p>

                    <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
                    <p className="mb-4">By accessing this website we assume you accept these terms and conditions. Do not continue to use TradeHub if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h3 className="text-xl font-semibold mb-2">2. Cookies</h3>
                    <p className="mb-4">We employ the use of cookies. By accessing TradeHub, you agreed to use cookies in agreement with the TradeHub's Privacy Policy.</p>

                    <h3 className="text-xl font-semibold mb-2">3. License</h3>
                    <p className="mb-4">Unless otherwise stated, TradeHub and/or its licensors own the intellectual property rights for all material on TradeHub. All intellectual property rights are reserved. You may access this from TradeHub for your own personal use subjected to restrictions set in these terms and conditions.</p>

                    <h3 className="text-xl font-semibold mb-2">4. User Comments</h3>
                    <p className="mb-4">Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. TradeHub does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of TradeHub, its agents and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions.</p>

                    <h3 className="text-xl font-semibold mb-2">5. Hyperlinking to our Content</h3>
                    <p className="mb-4">The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website.</p>

                    <h3 className="text-xl font-semibold mb-2">6. iFrames</h3>
                    <p className="mb-4">Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

                    <h3 className="text-xl font-semibold mb-2">7. Content Liability</h3>
                    <p className="mb-4">We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that arise on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or violation of any third party rights.</p>

                    <h3 className="text-xl font-semibold mb-2">8. Your Privacy</h3>
                    <p className="mb-4">Please read our <Link to="/privacy-policy" className="text-blue-500">Privacy Policy</Link>.</p>

                    <h3 className="text-xl font-semibold mb-2">9. Reservation of Rights</h3>
                    <p className="mb-4">We reserve the right to request that you remove all links or any particular link to our Website. You agree to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

                    <h3 className="text-xl font-semibold mb-2">10. Removal of links from our website</h3>
                    <p className="mb-4">If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to respond to you directly.</p>

                    <h3 className="text-xl font-semibold mb-2">11. Disclaimer</h3>
                    <p className="mb-4">To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
                    <ul className="list-disc list-inside mb-4">
                        <li>limit or exclude our or your liability for death or personal injury;</li>
                        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                    </ul>
                    <p className="mb-4">The limitations and prohibitions of liability set in this section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.</p>
                    <p className="mb-4">As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>

                    <h3 className="text-xl font-semibold mb-2">12. Hobby Project Disclaimer</h3>
                    <p className="mb-4">This website is a hobby project. It is not a professional project, so please do not provide your actual information to anyone apart from your email address while signing in. Also, the information listed here might not be accurate.</p>
                </section>
            </main>
        </div>
    );
};

export default TermsAndConditions;
