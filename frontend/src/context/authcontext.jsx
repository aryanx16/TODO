import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
      // Check localStorage for a token
      const token = localStorage.getItem("token");
      if (token) {
          setIsLogin(true); // User is logged in
      } else {
          setIsLogin(false); // User is not logged in
      }
  }, []);
  const handleLogin = () =>{console.log("logging"); setIsLogin(true)};
  const handleLogout = () => {console.log("logged out");
    toast.success("Logged Out")
    setIsLogin(false);localStorage.setItem("token","")};

  return (
    <AuthContext.Provider value={{ isLogin, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
