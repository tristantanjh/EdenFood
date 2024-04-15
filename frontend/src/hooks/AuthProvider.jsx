import React, { createContext, useContext, useState, useMemo } from "react";
import useLocalStorage from "./useLocalStorage.js";
import { useNavigate } from "react-router-dom";

//create a context on global scope
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [sessionId, setSessionId] = useLocalStorage("sessionId", null);
  const navigation = useNavigate();

  //placeholder function to authenticate user
  const login = async (data) => {
    setUser(data);
    console.log(data);
    // autogenerate sessionId
    setSessionId(Math.random().toString(36));
    navigation("/explore");
  };

  //placeholder function to sign out user
  const logout = () => {
    setUser(null);
    setSessionId(null);
    navigation("/", { replace: true });
  };

  const isAuthenticated = () => !!user;

  const isAdmin = user?.admin;

  //useMemo to improve performance
  const value = useMemo(
    () => ({
      user,
      setUser,
      sessionId,
      login,
      logout,
      isAuthenticated,
      isAdmin,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//wrap useContext in useAuth as a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
