import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000";

export const getChatbotResponse = async (query) => {
    return axios.post(`${API_BASE_URL}/chatbot`, { query });
};