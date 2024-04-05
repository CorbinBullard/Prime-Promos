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

  const loginGoogleMutation = useMutation({
    mutationKey: ["loginGoogle"],
    mutationFn: async (response) => {
      const res = await csrfFetch("/api/session/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
      if (!res.ok) throw new Error("Not A current User");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], data);
      // navigate("/dashboard"); // or any post-login route
    },
    // onError to handle login errors specifically can be defined here
  });

  const loginGoogle = (response) => loginGoogleMutation.mutate(response);

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

  // Update User Settings
  const updateUserMutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (values) => {
      const response = await csrfFetch("/api/users/self", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to update user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["session"]);
    },
    // onError to handle update user errors specifically can be defined here
  });
  const updateUser = (values) => updateUserMutation.mutate(values);

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
        updateUser,
        loginGoogle,
        isAdmin: user?.user?.role === "admin" || user?.user?.role === "owner",
        isOwner: user?.user?.role === "owner",
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
