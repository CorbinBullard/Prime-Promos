import React, { createContext, useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { csrfFetch } from "../utils/csrf";
import { useSession } from "./Session"; // Adjust the import path as needed
import { useNotification } from "./Notification"; // Adjust the import path as needed

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const { user } = useSession();
  const openNotification = useNotification();
  const queryClient = useQueryClient();

  const teamMembersQuery = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const response = await csrfFetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch team members");
      return response.json();
    },
    enabled: !!user, // Only fetch when user is logged in
  });

  const addMemberMutation = useMutation({
    mutationKey: ["addMember"],
    mutationFn: async (member) => {
      const response = await csrfFetch("/api/users/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to add member");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["teamMembers"]);
      openNotification({
        message: "Success",
        description: "Member added successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message,
        type: "error",
      });
    },
  });

  const reinviteMutation = useMutation({
    mutationKey: ["reinviteMember"],
    mutationFn: async (id) => {
      const response = await csrfFetch(`/api/users/invite/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to reinvite member");
      }
    },
    onSuccess: () => {
      openNotification({
        message: "Success",
        description: "Invite resent successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message,
        type: "error",
      });
    },
  });

  const deleteMemberMutation = useMutation({
    mutationKey: ["deleteMember"],
    mutationFn: async (id) => {
      const response = await csrfFetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete member");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teamMembers"]);
      openNotification({
        message: "Success",
        description: "Member deleted successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message,
        type: "error",
      });
    },
  });

  const value = {
    teamMembers: teamMembersQuery.data || [],
    isLoading: teamMembersQuery.isLoading,
    addMember: addMemberMutation.mutate,
    reinvite: reinviteMutation.mutate,
    deleteMember: deleteMemberMutation.mutate,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export const useTeam = () => useContext(TeamContext);
