import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Wallet, CreditCard, RefreshCw, TrendingUp, Send } from 'lucide-react';
import "./PayTransfer.css";

function PayTransfer() {
    const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
    const [exchangeRate, setExchangeRate] = useState(1);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [recentTransactions] = useState([
        { id: 1, amount: 500, date: "2024-02-24", status: "success", recipient: "John Doe" },
        { id: 2, amount: 1000, date: "2024-02-23", status: "success", recipient: "Alice Smith" },
        { id: 3, amount: 750, date: "2024-02-22", status: "pending", recipient: "Bob Johnson" }
    ]);

    const jwt = "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3NDAzMjUxNjgsImV4cCI6MTc0MDQxMTU2OCwiZW1haWwiOiJkZW1vQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiIn0.dRXSDbvaDDexrDgf8zELQlYnqXpQGnBbRFSUcRO7FyuodeX6qQF4KKA20icbLDd9";

    useEffect(() => {
        // Simulate exchange rate updates
        const interval = setInterval(() => {
            setExchangeRate(1 + Math.random() * 0.1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleCardMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        setCardRotation({ x: rotateX, y: rotateY });
    };

    const handleCardLeave = () => {
        setCardRotation({ x: 0, y: 0 });
    };

    const handlePayment = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            document.querySelector('.amount-input').classList.add('error-shake');
            setTimeout(() => {
                document.querySelector('.amount-input').classList.remove('error-shake');
            }, 500);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `http://18.216.105.158:8080/api/payment/${paymentMethod.toLowerCase()}/amount/${amount}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.payment_url) {
                setShowConfetti(true);
                setTimeout(() => {
                    window.location.href = response.data.payment_url;
                }, 1500);
            }
        } catch (error) {
            console.error("Payment error:", error);
            document.querySelector('.payment-card').classList.add('error-shake');
            setTimeout(() => {
                document.querySelector('.payment-card').classList.remove('error-shake');
            }, 500);
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (value, currency = "USD") => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(value);
    };

    const quickAmounts = [100, 500, 1000, 5000];

    return (
        <div className="payment-page">
            {showConfetti && <div className="confetti-container"></div>}


            <div className="payment-container">
                <div className="balance-section">
                    <div className="balance-card">
                        <div className="balance-header">
                            <h3>Available Balance</h3>
                            <div className="balance-amount">
                                <Wallet className="balance-icon" />
                                $2,450.00
                            </div>
                        </div>
                        <div className="exchange-rate">
                            <div className="rate-header">
                                <span>Live Exchange Rate</span>
                                <RefreshCw className="refresh-icon" />
                            </div>
                            <div className="rate-value">
                                <TrendingUp className="trend-icon" />
                                1 USD = {exchangeRate.toFixed(4)} EUR
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="payment-card"
                    onMouseMove={handleCardMove}
                    onMouseLeave={handleCardLeave}
                    style={{
                        transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`
                    }}
                >
                    <div className="card-header">
                        <h2>Transfer Money</h2>
                        <div className="payment-methods">
                            <button
                                className={`method-button ${paymentMethod === 'RAZORPAY' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('RAZORPAY')}
                            >
                                <CreditCard className="method-icon" />
                                Razorpay
                            </button>
                            <button
                                className={`method-button ${paymentMethod === 'STRIPE' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('STRIPE')}
                            >
                                <CreditCard className="method-icon" />
                                Stripe
                            </button>
                        </div>
                    </div>

                    <div className="amount-input-container">
                        <select
                            className="currency-select"
                            value={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                        <input
                            type="number"
                            className="amount-input"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="quick-amounts">
                        {quickAmounts.map((amt) => (
                            <button
                                key={amt}
                                className="quick-amount-btn"
                                onClick={() => setAmount(amt)}
                            >
                                {formatAmount(amt, selectedCurrency)}
                            </button>
                        ))}
                    </div>

                    <button
                        className={`pay-button ${loading ? 'loading' : ''}`}
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            <>
                                <Send className="send-icon" />
                                <span>Send Money</span>
                                <ArrowRight className="arrow-icon" />
                            </>
                        )}
                    </button>
                </div>

                <div className="recent-transactions">
                    <h3>Recent Transactions</h3>
                    <div className="transactions-list">
                        {recentTransactions.map((transaction) => (
                            <div key={transaction.id} className="transaction-item">
                                <div className="transaction-avatar">
                                    {transaction.recipient.charAt(0)}
                                </div>
                                <div className="transaction-details">
                                    <div className="transaction-recipient">
                                        {transaction.recipient}
                                    </div>
                                    <div className="transaction-amount">
                                        {formatAmount(transaction.amount)}
                                    </div>
                                    <div className="transaction-date">{transaction.date}</div>
                                </div>
                                <div className={`transaction-status ${transaction.status}`}>
                                    {transaction.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayTransfer;
