import axios from 'axios';

// MUDAR A URL
export const http = axios.create({
        baseURL: 'https://localhost:7133/'
})  