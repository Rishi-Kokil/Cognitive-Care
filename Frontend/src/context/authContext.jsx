import axios from 'axios';
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
    const [role, setRole] = useState(null);
    const Backend_URL = "http://localhost:8080";


    const login = (recievedToken, role) => {
        // Perform login actions (e.g., authenticate user with backend, get token)

        localStorage.setItem('jwtToken', recievedToken);
        localStorage.setItem('Role', role);

        setToken(recievedToken);
        setRole(role)
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Perform logout actions (e.g., clear token, reset state)
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('Role');

        setToken(null);
        setRole(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        // function defination
        const sendData = async () => {
            try {
                const response = await axios.post(`${Backend_URL}/authenticate`, {
                    role: role,
                    token: token,
                });

                if (response.data.success === true) {
                    setIsAuthenticated(true);
                }

                else {
                    setIsAuthenticated(false);
                    logout();
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Check for JWT token in local storage
        const token = localStorage.getItem('jwtToken');
        const role = localStorage.getItem('Role');
        console.log("setting up Auth context ....");

        if (token && role) {
            setToken(token);
            setRole(role);
            // calling the function here
            sendData();
        }


    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthComponent, useAuth };