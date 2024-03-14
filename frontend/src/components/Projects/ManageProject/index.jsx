import { Drawer, List, Modal, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useTeam } from "../../../context/useTeam";
import UserDropdown from "../../UI/UserDropdown";
import ManageMembers from "./ManageMembers";
import { useProjects } from "../../../hooks/useProjects";

export default function ManageProject({ project }) {
  const { teamMembers } = useTeam();
  const { resetCurrentProject, addUsersToProject } = useProjects();

  const [selectedTab, setSelectedTab] = useState("members");

  const tabList = [
    {
      key: "members",
      label: "Project Members",
    },
  ];
  console.log(project, !!project, "project");
  return (
    <Drawer
      open={!!project}
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

          {selectedTab === "members" && <ManageMembers project={project} />}
        </div>
      )}
    </Drawer>
  );
}
