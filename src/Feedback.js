// src/Feedback.js
import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css';

function Feedback() {
    const [feedback, setFeedback] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send feedback to backend (adjust the URL as needed)
            await axios.post('https://api.example.com/api/feedback', { feedback, suggestions });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    if (submitted) {
        return (
            <div className="feedback-container">
                <h1>Thank you for your feedback!</h1>
            </div>
        );
    }

    return (
        <div className="feedback-container">
            <h1>Feedback</h1>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label>Overall, how satisfied are you with our service?</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        placeholder="Your feedback..."
                    />
                </div>
                <div className="form-group">
                    <label>Suggestions for improvements:</label>
                    <textarea
                        value={suggestions}
                        onChange={(e) => setSuggestions(e.target.value)}
                        required
                        placeholder="Your suggestions..."
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

export default Feedback;
