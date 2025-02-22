import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './Dashboard.css';
import locationsImg from './assets/locations.png';
import loanImg from './assets/loan.png';
import merchantImg from './assets/merchant.png';
import SavingsImg from './assets/savings.png';
function Dashboard() {
    const location = useLocation();
    const userName = location.state?.userName || 'User';


    useEffect(() => {
        // Simulating a loading effect

    }, []);

    return (
        <>
            <Header />  {/* Render Header at the top */}
            <div className="dashboard-container">
                {/* Hero / Welcome Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Welcome, {userName}!</h1>
                        <p>We’ve analyzed your data to give you the best recommendations.</p>
                        <button>Explore Now</button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2>Explore Our Features</h2>
                    <div className="features-flex">
                        <Link to="/location-spending" className="feature-box">
                            <img src={locationsImg} alt="Location Spending" />
                            <h3>Location‐wise Spending</h3>
                            <p>Track your expenses by city or region</p>
                        </Link>

                        <Link to="/preapproved-loan" className="feature-box">
                            <img src={loanImg} alt="Preapproved Loan" />
                            <h3>Pre‐approved Loan</h3>
                            <p>Check out your special loan offers</p>
                        </Link>

                        <Link to="/merchant-spending" className="feature-box">
                            <img src={merchantImg} alt="Merchant Spending" />
                            <h3>Merchant‐based Spending</h3>
                            <p>Analyze transactions by store or brand</p>
                        </Link>

                        <Link to="/savings-plan" className="feature-box">
                            <img src={SavingsImg} alt="Savings Plan" />
                            <h3>Savings Plan</h3>
                            <p>Get recommendations for monthly savings</p>
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>

        </>
    );
}

export default Dashboard;
