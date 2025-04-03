import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Context
export const AuthContext = createContext();

// Custom Hook to Use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // ✅ Store token separately

  useEffect(() => {
    // Load user & token from storage on app start
    const loadAuthData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("authToken"); // ✅ Load token

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    };
    loadAuthData();
  }, []);

  const login = async (userData, authToken) => {
    setUser(userData);
    setToken(authToken); // ✅ Store token
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("authToken", authToken); // ✅ Save token in AsyncStorage
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("authToken"); // ✅ Remove token
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
