export const actionTypes = {
  FETCH_MEMBERS: "FETCH_MEMBERS",
  ADD_MEMBER: "ADD_MEMBER",
  UPDATE_MEMBER: "UPDATE_MEMBER",
  DELETE_MEMBER: "DELETE_MEMBER",
};

export const TeamReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MEMBERS:
      const formattedUsers = { ...state };
      action.payload.forEach((user) => {
        formattedUsers[user.id] = user;
      });
      return formattedUsers;
    case actionTypes.ADD_MEMBER:
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.UPDATE_MEMBER:
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.DELETE_MEMBER:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};
