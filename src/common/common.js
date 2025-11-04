// apiRequest.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("token");

export const apiRequest = async (endpoint, method, data = null, customHeaders = {}) => {
    try {
        const headers = {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...customHeaders,
        };

        const config = {
            url: `${BASE_URL}${endpoint}`,
            method,
            headers,
            data,
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`API Error [${method} ${endpoint}]`, error);
        throw error;
    }
};


export const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <span className="stars">
            {"★".repeat(fullStars)}
            {"☆".repeat(emptyStars)}
        </span>
    );
};

