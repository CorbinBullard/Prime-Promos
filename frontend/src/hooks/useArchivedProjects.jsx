import React from 'react'
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { csrfFetch } from "../utils/csrf"; // Consider making this injectable for easier testing
import { useNotification } from "../context/Notification";
import { useSession } from "../context/Session";

export default function useArchivedProjects() {
  const queryClient = useQueryClient();
  const openNotification = useNotification();
  const { isAdmin, user } = useSession();
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading,
  } = useQuery({
    queryKey: ["archivedProjects"],
    queryFn: async () => {
      const response = await csrfFetch("/api/projects/archived");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
    enabled: !!user && isAdmin,
  });
  // delete archived project
  const deleteProject = useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: async (projectId) => {
      const response = await csrfFetch(`/api/projects/${projectId}/archived`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to delete project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["archivedProjects"]);
      openNotification({
        message: "Success",
        description: "Project deleted successfully",
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
  }).mutate;

  // delete bulk archived projects
  const deleteProjectsBulk = useMutation({
    mutationKey: ["deleteBulkProjects"],
    mutationFn: async (projectIds) => {
      const response = await csrfFetch("/api/projects/archived", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectIds }),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to delete projects");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["archivedProjects"]);
      openNotification({
        message: "Success",
        description: "Projects deleted successfully",
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
  }).mutate;

  return {
    projects,
    projectsError,
    projectsLoading,
    deleteProject,
    deleteProjectsBulk,
  };
}
