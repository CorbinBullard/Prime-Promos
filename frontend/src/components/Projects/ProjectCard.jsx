import { Avatar, Card } from "antd";
import { DeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import React from "react";
import UserIcon from "../Members/UserIcon";
import OptionsButton from "../UI/OptionsButton";

export default function ProjectCard({ project }) {
  const projectUsers = project.Users;
  const handleProjectSelect = () => {
    console.log(project);
  };
  const handleProjectUserSelect = (e) => {
    e.stopPropagation();
    console.log(projectUsers);
  };
  const projectOptions = [
    {
      key: "users",
      label: "Manage Users",
      icon: <UserSwitchOutlined style={{ color: "skyblue" }} />,
      onClick: () => console.log("Edit"),
    },
    {
      key: "delete",
      label: "Delete Project",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onClick: () => console.log("Delete"),
    },
  ];
  return (
    <Card
      title={project.name}
      bordered={false}
      hoverable
      onClick={handleProjectSelect}
      style={{ width: 300 }}
      extra={<OptionsButton items={projectOptions} />}
      // actions={[<div onClick={handleProjectUserSelect}>View Users</div>]}
    ></Card>
  );
}
