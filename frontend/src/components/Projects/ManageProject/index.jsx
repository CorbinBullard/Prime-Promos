import { Drawer, List, Modal, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useTeam } from "../../../context/Members";
import { useProjectActions } from "../../../hooks/Projects/useProjectActions";
import UserDropdown from "../../UI/UserDropdown";
import ManageMembers from "./ManageMembers";

export default function ManageProject({ project, dispatch }) {
  const { teamMembers } = useTeam();
  const { resetCurrentProject, addUsersToProject } =
    useProjectActions(dispatch);
  const [selectedTab, setSelectedTab] = useState("members");

  const tabList = [
    {
      key: "members",
      label: "Project Members",
    },
  ];
  return (
    <Drawer
      open={project !== null}
      onClose={resetCurrentProject}
      width={600}
      footer={null}
    >
      {project && (
        <div>
          <Tabs
            items={tabList}
            onChange={(tab) => setSelectedTab(tab)}
            defaultActiveKey="members"
          />

          {selectedTab === "members" && (
            <ManageMembers project={project} dispatch={dispatch} />
          )}
        </div>
      )}
    </Drawer>
  );
}
