import { useCallback, useState } from "react";
import { useNotification } from "../../context/Notification";
import { actionTypes } from "../../reducers/ProjectsReducer";
import { csrfFetch } from "../../utils/csrf";
import { useTeamState } from "../Team/useTeamState";
import { useTeam } from "../../context/Members";

export const useProjectActions = (dispatch) => {
  const { teamMembers } = useTeam();
  const [errors, setErrors] = useState({});
  const openNotification = useNotification();

  const createProject = useCallback(
    async (project) => {
      try {
        const response = await csrfFetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: actionTypes.CREATE_PROJECT, payload: data });
          openNotification({
            message: "Success",
            description: "Project created successfully",
            type: "success",
          });
        }
        return data;
      } catch (error) {
        console.error("Error creating project", error);
        return;
      }
    },
    [dispatch]
  );
  const addUsersToProject = async (projectId, users) => {
    try {
      const response = await csrfFetch(`/api/projects/${projectId}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users }),
      });
      const data = await response.json();
      if (response.ok) {
        const formattedUsers = users.map((id) => teamMembers[id]);
        dispatch({
          type: actionTypes.ADD_USERS_TO_PROJECT,
          payload: { projectId, users: formattedUsers },
        });
        openNotification({
          message: "Success",
          description: "Members added successfully",
          type: "success",
        });
      } else {
        if (data) {
          openNotification({
            message: "Error",
            description: data.error,
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error adding users to project", error);
    }
  };
  const removeUserFromProject = async (projectId, userId) => {
    try {
      const response = await csrfFetch(
        `/api/projects/${projectId}/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: actionTypes.REMOVE_USER_FROM_PROJECT,
          payload: { projectId, userId },
        });
        openNotification({
          message: "Success",
          description: "Member removed successfully",
          type: "success",
        });
      } else {
        if (data) {
          openNotification({
            message: "Error",
            description: data.error,
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error removing user from project", error);
    }
  };
  const updateProject = (project) => {
    dispatch({ type: actionTypes.UPDATE_PROJECT, payload: project });
  };
  const deleteProject = async (projectId) => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      openNotification({
        message: "Success",
        description: "Project deleted successfully",
        type: "success",
      });
      dispatch({ type: actionTypes.DELETE_PROJECT, payload: projectId });
    } else {
      openNotification({
        message: "Error",
        description: data.error,
        type: "error",
      });
    }
  };
  const selectProject = (project) => {
    dispatch({ type: actionTypes.LOAD_CURRENT_PROJECT, payload: project });
  };
  const resetCurrentProject = () => {
    dispatch({ type: actionTypes.RESET_CURRENT_PROJECT });
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    addUsersToProject,
    selectProject,
    resetCurrentProject,
    removeUserFromProject,
  };
};
