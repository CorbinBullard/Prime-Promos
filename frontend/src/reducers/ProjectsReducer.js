import { useTeamState } from "../hooks/Team/useTeamState";

export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS",
  CREATE_PROJECT: "CREATE_PROJECT_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  ADD_USERS_TO_PROJECT: "ADD_USERS_TO_PROJECT",
};

export const ProjectsReducer = (state, action) => {
  console.log("PREV STATE", state);

  switch (action.type) {
    case actionTypes.FETCH_PROJECTS: {
      const newState = { ...state };
      action.payload.forEach((project) => {
        newState[project.id] = project;
      });
      return newState;
    }
    case actionTypes.CREATE_PROJECT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case actionTypes.UPDATE_PROJECT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case actionTypes.DELETE_PROJECT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case actionTypes.ADD_USERS_TO_PROJECT: {
      // console.log("Adding users to project", action.payload);
      const newState = { ...state };
      // console.log("NEW STATE", newState);
      newState[action.payload.projectId].Users = [
        ...newState[action.payload.projectId].Users,
        ...action.payload.users,
      ];
      return newState;
    }
    default:
      return state;
  }
};
