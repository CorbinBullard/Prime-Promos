import { Drawer, Tabs } from "antd";
import React from "react";
import ManageUsersTab from "./Tabs/ManageUsersTab";

export default function index({ project, deselectProject }) {
  const tabItems = [
    {
      key: "users",
      label: "Manage Users",
      children: <ManageUsersTab project={project} />,
    },
  ];

  return (
    <Drawer open={!!project} onClose={deselectProject} width={500}>
      {project && <Tabs items={tabItems} />}
    </Drawer>
  );
}
