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
        // Fetch global news using NewsAPI
        const fetchNews = async () => {
            try {
                const newsResponse = await axios.get('http://localhost:5000/api/news', {
                    params: {
                        country: 'us',
                        category: 'business',
                        apiKey: 'DREBB0YREWMQ00MR' // Replace with your NewsAPI key
                    }
                });
                setNews(newsResponse.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        // Fetch real-time stock data from Alpha Vantage
        const fetchStocks = async () => {
            try {
                const stocksResponse = await axios.get('http://localhost:5000/api/stocks', {
                    params: {
                        function: 'TIME_SERIES_INTRADAY',
                        symbol: 'AAPL',
                        interval: '5min',
                        apikey: 'DREBB0YREWMQ00MR' // Replace with your Alpha Vantage API key
                    }
                });
                const data = stocksResponse.data;
                const timeSeries = data["Time Series (5min)"];
                if (timeSeries) {
                    const latestTime = Object.keys(timeSeries)[0];
                    const latestPrice = timeSeries[latestTime]["4. close"];
                    setStocks([{ name: 'AAPL', price: latestPrice }]);
                } else {
                    console.error('No time series data received:', data);
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchNews();
        fetchStocks();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Validate credentials then navigate to dashboard (dummy implementation)
        navigate('/dashboard', { state: { userName: 'User' } });
    };

    return (
        <div className="login-container">
            {/* Left side: News & Stock information */}
            <div className="news-section">
                <h1>Real Time FinTech Innovations of 2025</h1>
                <h2>Global Economic Data & Real Time Stock Market Trends Today</h2>
                <section className="news-section-inner">
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

            {/* Right side: Login form */}
            <div className="form-section">
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
