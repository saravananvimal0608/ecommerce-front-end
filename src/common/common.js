import axios from 'axios'

const BASE_URL = "https://fakestoreapi.com";

export const apiRequest = async (endpoint, method, data = null, headers = {}) => {
    try {
        const config = {
            url: `${BASE_URL}${endpoint}`,
            method,
            headers,
            data,
        }
        const response = await axios(config)
        return response.data
    } catch (error) {
        console.error(`API Error [${method} ${endpoint}]`, error);
        throw error
    }
}

export const validate = (data, type) => {
    const temperrors = {}

    if (!data.email.trim()) {
        temperrors.email = "enter the email"
    }
    if (type === "register") {
        if (!data.email.trim()) {
            temperrors.email = "email is required"
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            temperrors.email = "invalid email format"
        }
    }
    if (!data.password.trim()) {
        temperrors.password = "enter the password"
    } else if (data.password.length < 4) {
        temperrors.password = "Password must be at least 8 characters"
    }
    return temperrors
}