import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();

    // Hardcoded user data
    const user = {
        firstName: 'Joshith',
        lastName: 'Reddy Aleti',
        phone: '123-456-7890',
        address: '123 Main Street, City, Country',
        ssn: '123456789',
        birthday: '1990-01-01',
        cardNumber: '4111111111111111',
        cardExpiration: '12/25',
    };

    // Helper function to mask sensitive data (show only last 2 digits)
    const maskValue = (value) => {
        if (!value || value.length < 2) return '';
        return 'xxxxxx' + value.slice(-2);
    };

    // Hardcoded credit card suggestions
    const creditCards = [
        {
            id: 1,
            name: 'Platinum Credit Card',
            creditLimit: '$5000',
            apr: '12%',
            annualFee: '$0',
            details:
                'Terms: 0% intro APR for 12 months, balance transfer fee 3%, late fee up to $35.',
        },
        {
            id: 2,
            name: 'Gold Credit Card',
            creditLimit: '$3000',
            apr: '15%',
            annualFee: '$50',
            details:
                'Terms: 15% APR, no balance transfer fee, rewards on groceries and travel.',
        },
    ];

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
                        <strong>Birthday:</strong> {user.birthday}
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
                            {/* CVV is not displayed for security */}
                        </div>
                        <div className="card-holder">
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                </div>
            </div>

            {/* Credit Card Suggestions Section */}
            <div className="credit-suggestions">
                <h2>Credit Card Suggestions</h2>
                <div className="cards-container">
                    {creditCards.map((card) => (
                        <div key={card.id} className="suggestion-card">
                            <div className="card-main">
                                <h3>{card.name}</h3>
                                <p>
                                    <strong>Credit Limit:</strong> {card.creditLimit}
                                </p>
                                <p>
                                    <strong>APR:</strong> {card.apr}
                                </p>
                                <p>
                                    <strong>Annual Fee:</strong> {card.annualFee}
                                </p>
                            </div>
                            <div className="card-tooltip">
                                <p>{card.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => navigate('/feedback')} className="feedback-button">
                Give Feedback
            </button>
        </div>
    );
}

export default Profile;
