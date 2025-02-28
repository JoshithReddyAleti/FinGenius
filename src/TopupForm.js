import React, { useState } from "react";
import axios from "axios";

const TopupForm = () => {
    const [paymentMethod, setPaymentMethod] = useState("razorpay"); // Default selection
    const [amount, setAmount] = useState("");

    // Hardcoded JWT for now
    const jwt = "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3NDAzMTk4NjQsImV4cCI6MTc0MDQwNjI2NCwiZW1haWwiOiJkZW1vQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiIn0.wMXQJIzARp_rQ6Q-3NxgM7DDglY_b8A7_a8kt62dcZ17KjZruOEQgeTupN5THRPG";

    const handlePayment = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            const response = await axios.post(
                `http://18.216.105.158:8080/api/payment/${paymentMethod}/amount/${amount}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.payment_url) {
                window.location.href = response.data.payment_url; // Redirect to payment page
            } else {
                alert("Failed to initiate payment.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment initiation failed. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Top-up Wallet</h2>

            <div style={styles.toggleContainer}>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={paymentMethod === "RAZORPAY"}
                        onChange={() => setPaymentMethod(paymentMethod === "STRIPE" ? "RAZORPAY" : "STRIPE")}
                    />
                    <span className="slider"></span>
                </label>
                <span>Razorpay</span>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={paymentMethod === "STRIPE"}
                        onChange={() => setPaymentMethod(paymentMethod === "RAZORPAY" ? "STRIPE" : "RAZORPAY")}
                    />
                    <span className="slider"></span>
                </label>
                <span>Stripe</span>
            </div>

            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
            />

            <button onClick={handlePayment} style={styles.button}>
                Proceed to Pay
            </button>
        </div>
    );
};

const styles = {
    container: {
        width: "300px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#f8f8f8",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
    },
    toggleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        textAlign: "center",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        width: "100%",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default TopupForm;