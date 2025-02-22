// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [news, setNews] = useState([]);
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        // Fetch news from your backend proxy
        const fetchNews = async () => {
            try {
                const newsResponse = await axios.get('http://localhost:5000/api/news');
                setNews(newsResponse.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        // Fetch stock data from your backend proxy
        const fetchStocks = async () => {
            try {
                const stocksResponse = await axios.get('http://localhost:5000/api/stocks');
                const latestPrice = stocksResponse.data.latestPrice; // adjust based on your response structure
                setStocks([{ name: 'AAPL', price: latestPrice }]);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchNews();
        fetchStocks();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Validate credentials (in a real application) then navigate
        navigate('/dashboard', { state: { userName: 'User' } });
    };

    return (
        <div className="login-container">
            {/* Dynamic content section */}
            <div className="dynamic-content">
                <h1>Real Time FinTech Innovations of 2025</h1>
                <h2>Global Economic Data & Real Time Stock Market Trends Today</h2>

                <section className="news-section">
                    <h3>Top News Headlines</h3>
                    <ul>
                        {news.length > 0 ? (
                            news.map((article, index) => (
                                <li key={index}>
                                    <a href={article.url} target="_blank" rel="noreferrer">
                                        {article.title}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>Loading news...</li>
                        )}
                    </ul>
                </section>

                <section className="stocks-section">
                    <h3>Stock Market Trends</h3>
                    <ul>
                        {stocks.length > 0 ? (
                            stocks.map((stock, index) => (
                                <li key={index}>
                                    {stock.name}: ${stock.price}
                                </li>
                            ))
                        ) : (
                            <li>Loading stock data...</li>
                        )}
                    </ul>
                </section>
            </div>

            {/* Login form section */}
            <div className="login-form">
                <div className="form-card">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <p>
                        New user? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
