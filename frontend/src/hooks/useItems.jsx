import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { csrfFetch } from "../utils/csrf"; // Consider making this injectable for easier testing
import { useNotification } from "../context/Notification";

export default function useItems({ projectId, itemId }) {
  const queryClient = useQueryClient();
  const openNotification = useNotification();
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch items with React Query
  const {
    data: items,
    error: itemsError,
    isLoading: itemsLoading,
  } = useQuery({
    queryKey: ["items", projectId],
    queryFn: async () => {
      const response = await csrfFetch(`/api/projects/${projectId}/items`);
      if (!response.ok) throw new Error("Failed to fetch items");
      return response.json();
    },
    enabled: !!projectId, // Fetch only if projectId is provided
  });
  // Fetch project name
  const {
    data: projectName,
    error: projectNameError,
    isLoading: projectNameLoading,
  } = useQuery({
    queryKey: ["projectName", projectId],
    queryFn: async () => {
      const response = await csrfFetch(`/api/projects/${projectId}`);
      if (!response.ok) throw new Error("Failed to fetch project name");
      return response.json();
    },
    enabled: !!projectId,
  });

  // Generic success handler for mutations
  const handleSuccess = (message) => {
    queryClient.invalidateQueries(["items"]); // Consider more dynamic invalidation if needed
    openNotification({
      message: "Success",
      description: message,
      type: "success",
    });
  };

  // Generic error handler for mutations
  const handleError = (error) => {
    openNotification({
      message: "Error",
      description: error.message,
      type: "error",
    });
  };

  // Mutation for creating an item
  const createItem = useMutation({
    mutationFn: async (item) => {
      const response = await csrfFetch(`/api/projects/${projectId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to create item");
      }
      return response.json();
    },
    onSuccess: () => handleSuccess("Item created successfully"),
    onError: handleError,
  }).mutate;

  // Mutation for updating an item
  const updateItem = useMutation({
    mutationFn: async (values) => {
      const response = await csrfFetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to update item");
      }
      return response.json();
    },
    onSuccess: () => handleSuccess("Item updated successfully"),
    onError: handleError,
  }).mutate;

  // Mutation for deleting an item
  const deleteItem = useMutation({
    mutationFn: async (id) => {
      const response = await csrfFetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
    },
    onSuccess: () => handleSuccess("Item deleted successfully"),
    onError: handleError,
  }).mutate;

  const createItemNote = useMutation({
    mutationFn: async (note) => {
      const response = await csrfFetch(`/api/items/${itemId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to create note");
      }
      return response.json();
    },
    onSuccess: () => handleSuccess("Note created successfully"),
    onError: handleError,
  }).mutate;

  const updateItemNote = useMutation({
    mutationFn: async (note) => {
      const response = await csrfFetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to update note");
      }
      return response.json();
    },
    onSuccess: () => handleSuccess("Note updated successfully"),
    onError: handleError,
  }).mutate;

  const deleteItemNote = useMutation({
    mutationFn: async (id) => {
      const response = await csrfFetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete note");
    },
    onSuccess: () => handleSuccess("Note deleted successfully"),
    onError: handleError,
  }).mutate;

  return {
    items,
    selectedItem,
    itemsError,
    itemsLoading,
    projectName,
    createItem,
    updateItem,
    deleteItem,
    setSelectedItem,
    createItemNote,
    updateItemNote,
    deleteItemNote,
  };
}
