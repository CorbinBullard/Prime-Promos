import { useCallback, useState } from "react";
import { useNotification } from "../../context/Notification";
import { actionTypes } from "../../reducers/ProjectsReducer";
import { csrfFetch } from "../../utils/csrf";

export const useProjectActions = (dispatch) => {
  const [errors, setErrors] = useState({});
  const openNotification = useNotification();

  const createProject = useCallback(
    async (project) => {
      console.log("Creating project", project);
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
  const addUsersToProject = useCallback(
    async (projectId, users) => {
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
          dispatch({
            type: actionTypes.ADD_USERS_TO_PROJECT,
            payload: { projectId, users },
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
    },
    [dispatch]
  );
  const updateProject = (project) => {
    dispatch({ type: actionTypes.UPDATE_PROJECT, payload: project });
  };
  const deleteProject = (projectId) => {
    dispatch({ type: actionTypes.DELETE_PROJECT, payload: projectId });
  };
  return { createProject, updateProject, deleteProject, addUsersToProject };
};
