import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { csrfFetch } from "../utils/csrf";
import { useNotification } from "../context/Notification";

export default function useItems({ projectId, itemId }) {
  const queryClient = useQueryClient();
  const openNotification = useNotification();
  const [selectedItem, setSelectedItem] = useState(null);

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
    enabled: !!projectId,

  });

  // Create item
  const createItemMutation = useMutation({
    mutationKey: ["createItem"],
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(["items"]);
      openNotification({
        message: "Success",
        description: "Item created successfully",
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

  // Update item
  const updateItemMutation = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: async (values) => {
      console.log("item", values);

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
    onSuccess: (data) => {
      queryClient.invalidateQueries(["items"]);
      openNotification({
        message: "Success",
        description: "Item updated successfully",
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
  // Delete item
  const deleteItemMutation = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: async (id) => {
      const response = await csrfFetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
      openNotification({
        message: "Success",
        description: "Item deleted successfully",
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

  // Function wrappers for mutations
  const createItem = (item) => createItemMutation.mutate(item);
  const updateItem = (item) => updateItemMutation.mutate(item);
  const deleteItem = (id) => deleteItemMutation.mutate(id);

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
