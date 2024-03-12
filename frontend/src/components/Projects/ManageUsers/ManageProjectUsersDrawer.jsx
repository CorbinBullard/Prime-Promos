import { Drawer, List, Modal, Table, Tabs } from "antd";
import React, { useState } from "react";
import { useTeam } from "../../../context/Members";
import { useProjectActions } from "../../../hooks/Projects/useProjectActions";

export default function ManageProjectUsers({ project, dispatch }) {
  const { teamMembers } = useTeam();
  const { resetCurrentProject } = useProjectActions(dispatch);
  const [selectedTab, setSelectedTab] = useState("current");
  const tabList = [
    {
      key: "current",
      label: "Project Users",
    },
    {
      key: "members",
      label: "Team Members",
    },
  ];
  return (
    <Modal
      open={project !== null}
      onCancel={resetCurrentProject}
      width={600}
    >
      <>
        <Tabs items={tabList} />
        <p>Choose who can access this project</p>
        {/* <List dataSource={}/> */}
      </>
    </Modal>
  );
}
