import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data is in localStorage when app starts
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Store user data in context
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
