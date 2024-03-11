// TeamContext.js
import React, { createContext, useContext } from "react";
import { useTeamState } from "../hooks/Team/useTeamState";
import { useTeamActions } from "../hooks/Team/useTeamActions";

// Create Context
const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const { teamMembers, dispatch } = useTeamState();
  const teamActions = useTeamActions(dispatch);
    console.log("Team Actions: ", teamActions);
  const value = {
    teamMembers,
    ...teamActions,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export const useTeam = () => useContext(TeamContext);
