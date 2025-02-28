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
    const locationUserName = location.state?.userName || 'User';
    const [userName, setUserName] = useState(locationUserName);
    const [activeFeature, setActiveFeature] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        }

        const timer = setTimeout(() => setShowWelcomeModal(false), 3000);

        const clockInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(clockInterval);
        };
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
        <div className="dashboard-wrapper">
            <Header />
            <div className="dashboard-container">
                {showWelcomeModal && (
                    <div className="welcome-modal">
                        <div className="modal-content">
                            <div className="welcome-icon">👋</div>
                            <h2>Welcome back, {userName}!</h2>
                            <p>We've got some exciting updates for you.</p>
                            <div className="pulse-effect"></div>
                        </div>
                    </div>
                )}

                <section className="hero-section">
                    <div className="hero-content">
                        <div className="time-display">
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <h1>Welcome Back, {userName}</h1>
                        <p className="subtitle">Your financial journey continues here</p>
                        <div className="hero-stats">
                            <div className="stat-card">
                                <span className="stat-icon">💰</span>
                                <h3>Total Balance</h3>
                                <p>$12,450.00</p>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">📊</span>
                                <h3>Monthly Savings</h3>
                                <p>$2,850.00</p>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">🎯</span>
                                <h3>Goals Progress</h3>
                                <p>75%</p>
                            </div>
                        </div>
                    </div>
                </section>

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

                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button>Transfer Money</button>
                        <button>Pay Bills</button>
                        <button>Invest Now</button>
                        <button>Contact Support</button>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
