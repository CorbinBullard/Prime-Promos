import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { csrfFetch } from "../utils/csrf";
import { useNotification } from "../context/Notification";
import { useCallback, useState } from "react";

export function useProjects() {
  const queryClient = useQueryClient();
  const openNotification = useNotification();
  const [currentProject, setCurrentProject] = useState(null);

  // Fetch projects
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await csrfFetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });

  // Create project
  const createProjectMutation = useMutation({
    mutationKey: ["createProject"],
    mutationFn: async (project) => {
      // Function to create project
      const response = await csrfFetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to create project");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projects"]);
      openNotification({
        message: "Success",
        description: "Project created successfully",
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

  // Update project
  const updateProjectMutation = useMutation({
    mutationKey: ["updateProject"],
    mutationFn: async ({ projectId, project }) => {
      const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      openNotification({
        message: "Success",
        description: "Project updated successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message || "Failed to update project",
        type: "error",
      });
    },
  });

  // Delete project
  const deleteProjectMutation = useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: async (projectId) => {
      const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      openNotification({
        message: "Success",
        description: "Project deleted successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message || "Failed to delete project",
        type: "error",
      });
    },
  });

  // Add users to project
  const addUsersToProjectMutation = useMutation({
    mutationKey: ["addUsersToProject"],
    mutationFn: async ({ projectId, users }) => {
      // Function to add users to project
      const response = await csrfFetch(`/api/projects/${projectId}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add users to project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      openNotification({
        message: "Success",
        description: "Members added successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message || "Failed to add users to project",
        type: "error",
      });
    },
    // onSuccess, onError similar to above
  });

  // Remove user from project
  const removeUserFromProjectMutation = useMutation({
    mutationKey: ["removeUserFromProject"],
    mutationFn: async ({ projectId, userId }) => {
      // Function to remove user from project
      const response = await csrfFetch(
        `/api/projects/${projectId}/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove user from project");
      }
      return response.json();
    },
    // onSuccess, onError similar to above
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      openNotification({
        message: "Success",
        description: "Member removed successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message || "Failed to remove user from project",
        type: "error",
      });
    },
  });

  // Function wrappers for mutations
  const createProject = (project) => createProjectMutation.mutate(project);
  const updateProject = ({ projectId, project }) =>
    updateProjectMutation.mutate({ projectId, project });
  const deleteProject = (projectId) => deleteProjectMutation.mutate(projectId);
  const addUsersToProject = ({ projectId, users }) =>
    addUsersToProjectMutation.mutate({ projectId, users });
  const removeUserFromProject = ({ projectId, userId }) =>
    removeUserFromProjectMutation.mutate({ projectId, userId });

  return {
    projects,
    currentProject,
    projectsError,
    projectsLoading,
    createProject,
    updateProject,
    deleteProject,
    addUsersToProject,
    removeUserFromProject,
  };
}