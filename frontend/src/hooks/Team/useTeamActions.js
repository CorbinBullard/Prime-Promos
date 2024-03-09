// useTeamActions.js
import { useCallback, useState } from "react";
import { actionTypes } from "../../reducers/TeamReducer";
import { useNotification } from "../../context/Notification";
import { csrfFetch } from "../../utils/csrf";

export const useTeamActions = (dispatch) => {
  const [errors, setErrors] = useState({});
  const openNotification = useNotification();

  const addMember = useCallback(
    async (member) => {
      try {
        const response = await csrfFetch("/api/users/invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(member),
        });
        const data = await response.json();
        if (response.status === 200) {
          dispatch({ type: actionTypes.ADD_MEMBER, payload: data });
          openNotification({
            message: "Success",
            description: "Member added successfully",
            type: "success",
          });
        } else {
          if (data.error) {
            openNotification({
              message: "Error",
              description: data.error,
              type: "error",
            });
          }
          setErrors(data);
        }
      } catch (error) {
        console.error("Error adding member", error);
      }
    },
    [dispatch, openNotification]
  );

  const reinvite = useCallback(
    async (id) => {
      try {
        const response = await csrfFetch(`/api/users/invite/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          openNotification({
            message: "Success",
            description: "Invite resent successfully",
            type: "success",
          });
        } else {
          if (data.error) {
            openNotification({
              message: "Error",
              description: data.error,
              type: "error",
            });
          }
          setErrors(data);
        }
      } catch (error) {
        console.error("Error reinviting member", error);
      }
    },
    [dispatch, openNotification]
  );

  const deleteMember = useCallback(
    async (id) => {
      try {
        const response = await csrfFetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          dispatch({ type: actionTypes.DELETE_MEMBER, payload: id });
          openNotification({
            message: "Success",
            description: "Member deleted successfully",
            type: "success",
          });
        } else {
          const data = await response.json();
          openNotification({
            message: "Error",
            description: data.error,
            type: "error",
          });
          setErrors(data);
        }
      } catch (error) {
        console.error("Error deleting member", error);
      }
    },
    [dispatch, openNotification]
  );

  return { addMember, reinvite, deleteMember, errors };
};
