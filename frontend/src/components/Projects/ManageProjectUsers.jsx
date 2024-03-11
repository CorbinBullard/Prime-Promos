import { Drawer } from "antd";
import React, { useState } from "react";
import { useProjectActions } from "../../hooks/Projects/useProjectActions";
import { useTeamState } from "../../hooks/Team/useTeamState";

export default function ManageProjectUsers({ project, dispatch }) {
  const { teamMembers } = useTeamState();
  const { resetCurrentProject } = useProjectActions(dispatch);
  return (
    <Drawer open={project !== null} onClose={resetCurrentProject} width={500}>
      {project && <h1>{project.name}</h1>}
    </Drawer>
  );
}
