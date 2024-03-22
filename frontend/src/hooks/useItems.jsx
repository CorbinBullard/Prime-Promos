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

  return {
    items,
    selectedItem,
    itemsError,
    itemsLoading,
    createItem,
    updateItem,
    deleteItem,
    setSelectedItem,
  };
}
