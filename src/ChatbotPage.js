import React, { useState, useRef, useEffect } from "react";
import { getChatbotResponse } from "./api";
import Header from "./Header";
import Footer from "./Footer";
import "./Chatbot.css";

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [image, setImage] = useState(null);
    const [executionTime, setExecutionTime] = useState("");
    const [conversation, setConversation] = useState([
        { role: "bot", text: "Hi! I'm your AI financial assistant. How can I help you today?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    const simulateTyping = async (text) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsTyping(false);
        return text;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage = { role: "user", text: query };
        setConversation(prev => [...prev, userMessage]);

        const userQuery = query;
        setQuery("");

        try {
            setIsTyping(true);
            const res = await getChatbotResponse(userQuery);

            if (res.data.text) {
                const processedText = await simulateTyping(res.data.text);
                const botMessage = { role: "bot", text: processedText };
                setConversation(prev => [...prev, botMessage]);
                setResponse(processedText);
            }

            if (res.data.image) {
                setImage(`data:image/png;base64,${res.data.image}`);
                const botMessage = { role: "bot", image: `data:image/png;base64,${res.data.image}` };
                setConversation(prev => [...prev, botMessage]);
            }

            if (res.data.execution_time) {
                setExecutionTime(res.data.execution_time);
            }
        } catch (err) {
            await simulateTyping("");
            const errorMessage = { role: "bot", text: "Sorry, something went wrong." };
            setConversation(prev => [...prev, errorMessage]);
        }
        setIsTyping(false);
    };

    return (
        <div className="page-container">
            <Header />
            <div className="chatbot-container">
                <div className="chatbot-header">
                    <div className="status-indicator"></div>
                    <h2>AI Financial Assistant</h2>
                </div>

                <div className="chat-history">
                    {conversation.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.role}`}>
                            <div className="message-content">
                                <div className="message-icon">
                                    {msg.role === "user" ? "👤" : "🤖"}
                                </div>
                                <div className="message-bubble">
                                    {msg.text && <span dangerouslySetInnerHTML={{ __html: msg.text }} />}
                                    {msg.image && <img src={msg.image} alt="Trend Analysis" />}
                                </div>
                            </div>
                            <div className="message-time">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask me anything about finance..."
                        className="chat-input"
                    />
                    <button type="submit" className="send-button">
                        <span className="button-icon">➤</span>
                    </button>
                </form>

                {executionTime && (
                    <div className="execution-time">
                        Response Time: {executionTime}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Chatbot;
