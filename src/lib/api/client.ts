import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});