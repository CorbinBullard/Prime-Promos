export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS",
  CREATE_PROJECT: "CREATE_PROJECT_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  ADD_USERS_TO_PROJECT: "ADD_USERS_TO_PROJECT",
  REMOVE_USER_FROM_PROJECT: "REMOVE_USER_FROM_PROJECT",
  LOAD_CURRENT_PROJECT: "LOAD_CURRENT_PROJECT",
  RESET_CURRENT_PROJECT: "RESET_CURRENT_PROJECT",
};

export const ProjectsReducer = (state = { all: {}, current: null }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS: {
      const newState = { ...state };
      action.payload.forEach((project) => {
        newState.all[project.id] = project;
      });
      return newState;
    }
    case actionTypes.CREATE_PROJECT: {
      const newState = { ...state };
      newState.all[action.payload.id] = action.payload;
      return newState;
    }
    case actionTypes.UPDATE_PROJECT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case actionTypes.DELETE_PROJECT: {
      const newState = { ...state };
      delete newState.all[action.payload];
      return newState;
    }
    case actionTypes.ADD_USERS_TO_PROJECT: {
      const newState = { ...state };
      newState.all[action.payload.projectId].Users = [
        ...newState.all[action.payload.projectId].Users,
        ...action.payload.users,
      ];
      return newState;
    }
    case actionTypes.LOAD_CURRENT_PROJECT: {
      const newState = { ...state };
      newState.current = action.payload;
      return newState;
    }
    case actionTypes.RESET_CURRENT_PROJECT: {
      const newState = { ...state };
      newState.current = null;
      return newState;
    }
    case actionTypes.REMOVE_USER_FROM_PROJECT: {
      const newState = { ...state };
      newState.all[action.payload.projectId].Users = newState.all[
        action.payload.projectId
      ].Users.filter((user) => user.id !== action.payload.userId);
      newState.current = {
        ...newState.current,
        Users: newState.current.Users.filter(
          (user) => user.id !== action.payload.userId
        ),
      };
      return newState;
    }
    default:
      return state;
  }
};
