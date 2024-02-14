import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

// Custom hook to access AuthContext
const useAuth = () => {
    return useContext(AuthContext);
};

//Wrapper for this authContext and Methods to access this Context
const AuthComponent = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = (recievedToken) => {
        // Perform login actions (e.g., authenticate user with backend, get token)
        const token = recievedToken; // Sample token, replace with actual token
        localStorage.setItem('jwtToken', token);
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Perform logout actions (e.g., clear token, reset state)
        localStorage.removeItem('jwtToken');
        setToken(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        // Check for JWT token in local storage
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated , token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthComponent, useAuth };