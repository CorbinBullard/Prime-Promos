// useTeamState.js
import { useEffect, useReducer } from "react";
import { TeamReducer, actionTypes } from "../../reducers/TeamReducer";
import { csrfFetch } from "../../utils/csrf";

export const useTeamState = (initialState = {}) => {
  const [teamMembers, dispatch] = useReducer(TeamReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await csrfFetch("/api/users");
        const data = await response.json();
        dispatch({ type: actionTypes.FETCH_MEMBERS, payload: data });
      } catch (error) {
        console.error("Error fetching team members", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return { teamMembers, dispatch };
};
