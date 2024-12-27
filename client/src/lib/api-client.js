
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const apiClient = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
      Authorization: `Bearer ${cookies.get('token')}`
    },
    withCredentials: true,
});
apiClient.interceptors.request.use((config) => {
    let token = localStorage.getItem('user');
    if (token) {
      token = JSON.parse(token)?.token; // Ensure token is extracted if stored as an object
    } else {
      token = cookies.get('token');
    }
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  }, (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  });
      