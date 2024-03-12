import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../utils/csrf";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getSession() {
      setIsLoading(true);
      try {
        const response = await csrfFetch("/api/session");
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getSession();
  }, []);

  const login = async (form) => {
    setIsLoading(true);
    try {
      const response = await csrfFetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        setError("Invalid credentials");
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await csrfFetch("/api/session", {
        method: "DELETE",
      });
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SessionContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
