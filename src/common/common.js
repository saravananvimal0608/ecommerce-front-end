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
