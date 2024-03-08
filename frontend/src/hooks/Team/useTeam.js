import { useEffect, useReducer } from "react";
import { TeamReducer } from "../../reducers/TeamReducer";

export default function useTeam(initialState = {}) {
  const [teamMembers, dispatch] = useReducer(TeamReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        dispatch({ type: "FETCH_MEMBERS", payload: data });
      } catch (error) {
        console.error("Error fetching team members", error);
      }
    };
    fetchData();
  }, []);

  return [teamMembers, dispatch];
}
