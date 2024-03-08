import { useEffect, useReducer, useState } from "react";
import { TeamReducer, actionTypes } from "../reducers/TeamReducer";
import { useNotification } from "../context/Notification";

export default function useTeam(initialState = {}) {
  const [teamMembers, dispatch] = useReducer(TeamReducer, initialState);
  const [errors, setErrors] = useState({});
  const openNotification = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        dispatch({ type: actionTypes.FETCH_MEMBERS, payload: data });
      } catch (error) {
        console.error("Error fetching team members", error);
      }
    };
    fetchData();
  }, []);

  const addMember = async (member) => {
    try {
      const response = await fetch("/api/users/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });
      const data = await response.json();

      if (response.status !== 200) {
        if (data.error) {
          openNotification({
            message: "Error",
            description: data.error,
            type: "error",
          });
          return;
        }
        setErrors(data);
        return;
      }
      dispatch({ type: actionTypes.ADD_MEMBER, payload: data });
      openNotification({
        message: "Success",
        description: "Member added successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error adding member", error);
    }
  };

  const deleteMember = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.status !== 200) {
        const data = await response.json();
        openNotification({
          message: "Error",
          description: data.error,
          type: "error",
        });
        return;
      }
      dispatch({ type: actionTypes.DELETE_MEMBER, payload: id });
      openNotification({
        message: "Success",
        description: "Member deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting member", error);
    }
  };

  return { teamMembers, addMember, errors, deleteMember };
}
