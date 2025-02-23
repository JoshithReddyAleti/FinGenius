// src/PayTransfer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayTransfer.css';

function PayTransfer() {
    // State variables for backend data and form fields
    const [balance, setBalance] = useState(0);
    const [activity, setActivity] = useState([]);
    const [recipient, setRecipient] = useState('');
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Replace with your backend base URL
    const baseUrl = 'http://localhost:8080';

    // Fetch the current balance and transactions from the backend
    const fetchData = async () => {
        try {
            const balanceResponse = await axios.get(`${baseUrl}/api/balance`);
            setBalance(balanceResponse.data.balance);

            const transactionsResponse = await axios.get(`${baseUrl}/api/transactions`);
            setActivity(transactionsResponse.data.transactions);
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handler to send a payment/transfer
    const handleSend = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            setErrorMessage('Please enter a valid amount.');
            return;
        }

        const transaction = {
            recipient,
            account,
            amount: transferAmount,
            note,
        };

        setIsSending(true);

        try {
            // Call the test API to process the payment
            const response = await axios.post(`${baseUrl}/api/sendPayment`, transaction);
            if (response.data.success) {
                // On success, re-fetch balance and transactions
                await fetchData();
                // Clear form fields
                setRecipient('');
                setAccount('');
                setAmount('');
                setNote('');
            } else {
                setErrorMessage(response.data.message || 'Transaction failed.');
            }
        } catch (error) {
            setErrorMessage('Transaction error: ' + error.message);
        } finally {
            setIsSending(false);
        }
    };

    // Filter recent transactions based on the search term
    const filteredActivity = activity.filter((txn) =>
        txn.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (txn.note && txn.note.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="paytransfer-container">
            {/* Sidebar with navigation and search */}
            <aside className="sidebar">
                <h2>Menu</h2>
                <ul className="nav-items">
                    <li>Dashboard</li>
                    <li>Payments</li>
                    <li>Transfers</li>
                    <li>Activity</li>
                    <li>Settings</li>
                </ul>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search activity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </aside>

            {/* Main content area */}
            <main className="main-content">
                {/* Header with activity title and "Forgot Password" link */}
                <div className="header-section">
                    <div className="activity-header">
                        <h2>Recent Activity</h2>
                    </div>
                    <div className="auth-actions">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                </div>

                {/* Display current balance */}
                <div className="balance-box">
                    <h3>Your Balance: ${balance.toFixed(2)}</h3>
                </div>

                {/* Payment form */}
                <div className="payment-form-card">
                    <h2>Send Payment / Transfer</h2>
                    <form onSubmit={handleSend}>
                        <div className="form-group">
                            <label>Recipient Name:</label>
                            <input
                                type="text"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Recipient Account:</label>
                            <input
                                type="text"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount:</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Note (optional):</label>
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" disabled={isSending}>
                            {isSending ? 'Processing...' : 'Send Payment'}
                        </button>
                    </form>
                </div>

                {/* Recent Activity List */}
                <div className="activity-list">
                    {filteredActivity.length > 0 ? (
                        filteredActivity.map((txn) => (
                            <div key={txn.id} className="activity-item">
                                <p>
                                    <strong>{txn.recipient}</strong> - ${txn.amount.toFixed(2)}{' '}
                                    <span>({txn.date})</span>
                                </p>
                                {txn.note && <p>Note: {txn.note}</p>}
                            </div>
                        ))
                    ) : (
                        <p>No recent transactions.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default PayTransfer;
