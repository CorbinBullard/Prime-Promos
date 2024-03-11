import React, { useEffect, useReducer } from "react";
import { ProjectsReducer } from "../../reducers/ProjectsReducer";
import { csrfFetch } from "../../utils/csrf";
import { actionTypes } from "../../reducers/ProjectsReducer";

export const useProjectsState = (initialState = {}) => {
  const [projects, dispatch] = useReducer(ProjectsReducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await csrfFetch("/api/projects");
        const data = await response.json();
        dispatch({ type: actionTypes.FETCH_PROJECTS, payload: data });
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchData();
  }, [dispatch]);
  return { projects, dispatch };
};
