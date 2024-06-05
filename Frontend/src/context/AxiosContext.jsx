import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./authContext";
import axios from "axios";


const AxiosContext = createContext();

const useAxios = () => useContext(AxiosContext);

const AxiosContextWrapper = ({ children }) => {
    const { token } = useAuth();

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:8080/', // Replace with your API base URL
        });

        instance.interceptors.request.use(
            config => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        return instance;
    }, [token]);

    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    )
}

export { AxiosContextWrapper, useAxios };