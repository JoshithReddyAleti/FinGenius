import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

function Feedback() {
    const navigate = useNavigate();
    const [experience, setExperience] = useState('');
    const [feasibility, setFeasibility] = useState('');
    const [otherComments, setOtherComments] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // (Optional) Here you could also send the feedback data to your backend.
        setSubmitted(true);
        // After 3 seconds, redirect back to the profile page (or another page)
        setTimeout(() => {
            navigate('/profile');
        }, 3000);
    };

    return (
        <div className="feedback-container">
            <h1>User Feedback</h1>
            {submitted ? (
                <div className="feedback-success">
                    <div className="success-icon">✓</div>
                    <h2>Thank you for your feedback!</h2>
                    <p>We appreciate your input and will work on improvements.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-group">
                        <label>How would you rate your overall experience with our website?</label>
                        <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        >
                            <option value="">Select a rating</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="average">Average</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>How user-friendly and feasible do you find our website?</label>
                        <select
                            value={feasibility}
                            onChange={(e) => setFeasibility(e.target.value)}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="very_feasible">Very Feasible</option>
                            <option value="feasible">Feasible</option>
                            <option value="neutral">Neutral</option>
                            <option value="not_feasible">Not Feasible</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Additional Comments or Suggestions:</label>
                        <textarea
                            value={otherComments}
                            onChange={(e) => setOtherComments(e.target.value)}
                            placeholder="Enter your comments here..."
                            rows="4"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">
                        Submit Feedback
                    </button>
                </form>
            )}
        </div>
    );
}

export default Feedback;
