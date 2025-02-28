// src/PaymentResults.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentResult.css';

function PaymentResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const { success, message } = location.state || {};

    return (
        <div className="payment-results-container">
            {success ? (
                <div className="result-success">
                    <div className="icon">&#10004;</div> {/* Big tick mark */}
                    <h1>Payment Successful!</h1>
                    <p>{message}</p>
                </div>
            ) : (
                <div className="result-failure">
                    <div className="icon">&#10008;</div> {/* Big cross mark */}
                    <h1>Payment Failed!</h1>
                    <p>{message}</p>
                </div>
            )}
            <button onClick={() => navigate('/pay')}>Back to Payments</button>
        </div>
    );
}

export default PaymentResults;
