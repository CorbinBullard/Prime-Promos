// useTeamState.js
import { useEffect, useReducer } from "react";
import { TeamReducer, actionTypes } from "../../reducers/TeamReducer";
import { csrfFetch } from "../../utils/csrf";
import { useSession } from "../../context/Session";

export const useTeamState = (initialState = {}) => {
  const [teamMembers, dispatch] = useReducer(TeamReducer, initialState);
  const { user } = useSession();
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const response = await csrfFetch("/api/users");
        const data = await response.json();
        if (!response.ok) return;
        dispatch({ type: actionTypes.FETCH_MEMBERS, payload: data });
      } catch (error) {
        console.error("Error fetching team members", error);
      }
    };
    fetchData();
  }, [dispatch, user]);

  return { teamMembers, dispatch };
};
