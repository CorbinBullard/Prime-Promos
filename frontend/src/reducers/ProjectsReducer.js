export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS",
  CREATE_PROJECT: "CREATE_PROJECT_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  ADD_USERS_TO_PROJECT: "ADD_USERS_TO_PROJECT",
};

export const ProjectsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS: {
      const newState = { ...state };
      action.payload.forEach((project) => {
        newState[project.id] = project;
      });
      console.log("New state", newState);
      return newState;
    }
    case actionTypes.CREATE_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.UPDATE_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.DELETE_PROJECT:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};
