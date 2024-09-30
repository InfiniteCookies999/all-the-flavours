import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios.get("/api/auth/is-logged-in")
        .then(reponse => {
          setIsLoggedIn(reponse.data.status)
          setLoading(false);
        })
        .catch(error => console.log(error));
    }, []);

    const onLogout = () => {
      axios.post('/api/auth/logout')
        .then(() => {
          setIsLoggedIn(false); // Update state after logout.
          window.location.href = '/'; // Redirect to home.
        })
        .catch(error => console.log(error));
    };

    // If loading do not render the page.
    if (loading) {
      return;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};