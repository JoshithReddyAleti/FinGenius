// src/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from backend (adjust the URL as needed)
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/userProfile');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    // Helper function to mask sensitive data (show only last 2 digits)
    const maskValue = (value) => {
        if (!value || value.length < 2) return '';
        return 'xxxxxx' + value.slice(-2);
    };

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-info">
                <div className="user-details">
                    <p>
                        <strong>Name:</strong> {user.firstName} {user.lastName}
                    </p>
                    <p>
                        <strong>Phone:</strong> {user.phone}
                    </p>
                    <p>
                        <strong>Address:</strong> {user.address}
                    </p>
                    <p>
                        <strong>SSN:</strong> {maskValue(user.ssn)}
                    </p>
                </div>
                <div className="card-info">
                    <div className="credit-card">
                        <div className="card-header">
                            <span className="card-title">VISA</span>
                            <span className="card-chip">💳</span>
                        </div>
                        <div className="card-number">{maskValue(user.cardNumber)}</div>
                        <div className="card-details">
                            <div className="card-expiration">
                                <span>Expires</span>
                                <span>{user.cardExpiration}</span>
                            </div>
                            {/* We are not displaying CVV on the card for security */}
                        </div>
                        <div className="card-holder">
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/feedback')} className="feedback-button">
                Give Feedback
            </button>
        </div>
    );
}

export default Profile;
