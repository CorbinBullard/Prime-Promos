import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../utils/csrf";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch user session
  const {
    data: user,
    isLoading: isLoadingSession,
    error: sessionError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await csrfFetch("/api/session");
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    },
    // You can specify options such as cacheTime, staleTime, refetchOnWindowFocus, etc. here
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (form) => {
      const response = await csrfFetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], data);
      // navigate("/dashboard"); // or any post-login route
    },
    // onError to handle login errors specifically can be defined here
  });

  const login = (form) => loginMutation.mutate(form);

  // Logout mutation
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await csrfFetch("/api/session", {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network response was not ok.");
    },
    onSuccess: () => {
      queryClient.removeQueries(["session"], { exact: true });
      // navigate("/login"); // or any post-logout route
    },
    // onError to handle logout errors specifically can be defined here
  });

  const logout = () => logoutMutation.mutate();

  return (
    <SessionContext.Provider
      value={{
        user: user?.user,
        isLoading:
          isLoadingSession ||
          loginMutation.isLoading ||
          logoutMutation.isLoading,
        error: sessionError || loginMutation.error || logoutMutation.error,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
