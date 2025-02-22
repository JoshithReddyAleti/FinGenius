// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>AmazFinance — Baking Supplies</h3>
                <p>info@amazfinance.com | 123-456-7890</p>
                <p>500 Baker Street, 6th Floor, San Francisco, CA 94103</p>
                <div className="social-icons">
                    {/* Insert social media icons/links if desired */}
                    {/* <a href="#"><img src="..." alt="Facebook" /></a> */}
                    {/* <a href="#"><img src="..." alt="Twitter" /></a> */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
