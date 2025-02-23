// src/Dashboard.js
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
    // Get userName from router state, defaulting to 'User'
    const location = useLocation();
    const locationUserName = location.state?.userName || 'User';

    // Use state for userName (with possible override from localStorage)
    const [userName, setUserName] = useState(locationUserName);
    const [activeFeature, setActiveFeature] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);

    useEffect(() => {
        // Check localStorage for stored userName and update state if found
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        }
        // Show welcome modal for 3 seconds
        const timer = setTimeout(() => setShowWelcomeModal(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            name: "Location‐wise Spending",
            image: locationsImg,
            description: "Track your expenses by city or region",
            link: "/location-spending"
        },
        {
            name: "Pre‐approved Loan",
            image: loanImg,
            description: "Check out your special loan offers",
            link: "/preapproved-loan"
        },
        {
            name: "Merchant‐based Spending",
            image: merchantImg,
            description: "Analyze transactions by store or brand",
            link: "/merchant-spending"
        },
        {
            name: "Savings Plan",
            image: SavingsImg,
            description: "Get recommendations for monthly savings",
            link: "/savings-plan"
        }
    ];

    return (
        <>
            <Header />
            <div className="dashboard-container">
                {showWelcomeModal && (
                    <div className="welcome-modal">
                        <h2>Welcome back, {userName}!</h2>
                        <p>We've got some exciting updates for you.</p>
                    </div>
                )}

                {/* Hero / Welcome Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Your Financial Hub, {userName}</h1>
                        <p>Discover insights and opportunities tailored just for you.</p>
                        <button onClick={() => document.querySelector(".features-section").scrollIntoView({ behavior: "smooth" })}>
                            Explore Now
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2>Unlock Your Financial Potential</h2>
                    <div className="features-flex">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-box ${activeFeature === index ? "active" : ""}`}
                                onMouseEnter={() => setActiveFeature(index)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                <img src={feature.image || "/placeholder.svg"} alt={feature.name} />
                                <h3>{feature.name}</h3>
                                <p>{feature.description}</p>
                                {activeFeature === index && (
                                    <Link to={feature.link} className="feature-link">
                                        Explore Now
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Actions Section */}
                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button>Transfer Money</button>
                        <button>Pay Bills</button>
                        <button>Invest Now</button>
                        <button>Contact Support</button>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}

export default Dashboard;
