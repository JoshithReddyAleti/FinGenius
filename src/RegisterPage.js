// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Ensure you have a CSS file for styling

function RegisterPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Basic email validator accepting only @gmail.com or @student.edu emails.
    const validateEmail = (email) => {
        const pattern = /(@gmail\.com$|@student\.edu$)/i;
        return pattern.test(email);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Validate email before proceeding
        if (!validateEmail(email)) {
            setError('Please use a valid email address (e.g., ending with @gmail.com or @student.edu)');
            return;
        }
        // Registration logic goes here
        // For now, we just navigate to the dashboard using first name as the userName.
        navigate('/dashboard', { state: { userName: firstName } });
    };

    const handleGoogleSignIn = () => {
        // Implement Google sign-in logic here
        console.log('Sign in with Google');
    };

    const handleLinkedInSignIn = () => {
        // Implement LinkedIn sign-in logic here
        console.log('Sign in with LinkedIn');
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                <form onSubmit={handleRegister} className="register-form">
                    <div className="input-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
                <div className="social-login">
                    <p>Or sign in with:</p>
                    <button className="social-button google" onClick={handleGoogleSignIn}>
                        Google
                    </button>
                    <button className="social-button linkedin" onClick={handleLinkedInSignIn}>
                        LinkedIn
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
