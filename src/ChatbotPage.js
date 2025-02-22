// src/ChatbotPage.js
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function ChatbotPage() {
    const [inputMessage, setInputMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add the user message to the conversation
        const userMessage = { role: 'user', text: inputMessage };
        setConversation((prev) => [...prev, userMessage]);

        // Save current message and clear the input
        const message = inputMessage;
        setInputMessage('');

        try {
            // Send the user message to the backend API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Assume your backend sends back an object like { response: "Chatbot reply here" }
            const botMessage = { role: 'bot', text: data.response };
            setConversation((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error fetching response from chatbot:', error);
            const errorMessage = { role: 'bot', text: 'Sorry, something went wrong.' };
            setConversation((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <>
            <Header />
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Help Chatbot</h2>
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
                    {/* Chat conversation display */}
                    <div
                        style={{
                            border: '1px solid #ccc',
                            padding: '20px',
                            minHeight: '300px',
                            overflowY: 'auto',
                            backgroundColor: '#fafafa'
                        }}
                    >
                        {conversation.length === 0 && <p>Start the conversation by typing a message.</p>}
                        {conversation.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: '10px',
                                    textAlign: msg.role === 'user' ? 'right' : 'left'
                                }}
                            >
                                <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Chat input */}
                    <form onSubmit={handleSendMessage} style={{ marginTop: '20px' }}>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message here..."
                            style={{ width: '80%', padding: '10px', fontSize: '1rem' }}
                        />
                        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '1rem' }}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ChatbotPage;

