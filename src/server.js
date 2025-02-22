// server.js (Node.js/Express)
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get('https://api.gemini.com/v1/news', {
            params: {
                q: 'FinTech, Economic, Stock Market',
                apiKey: 'AIzaSyBQGnOMVM1Oqk-K03odV-CGBFWDyVFia78'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching news' });
    }
});

app.get('/api/stocks', async (req, res) => {
    try {
        const response = await axios.get('https://api.gemini.com/v1/marketdata', {
            params: {
                symbol: 'AAPL',
                apiKey: 'AIzaSyBQGnOMVM1Oqk-K03odV-CGBFWDyVFia78'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock data' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
