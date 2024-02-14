// Import Axios and any other dependencies
import axios from 'axios';
import { useAuth } from '../context/authContext';

const { isAuthenticated , token, login, logout } = useAuth();

axios.interceptors.request.use(
    (config) => {
        const authtoken = token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Export Axios instance
export default axios;

