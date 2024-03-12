import { Avatar, Card } from "antd";
import { DeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import React from "react";
import UserIcon from "../Members/UserIcon";
import OptionsButton from "../UI/OptionsButton";
import { useProjectActions } from "../../hooks/Projects/useProjectActions";

export default function ProjectCard({ project, dispatch }) {
  const { selectProject, deleteProject } = useProjectActions(dispatch);
  const projectUsers = project.Users;
  const handleProjectSelect = () => {
    console.log(project);
  };
  const handleProjectUserSelect = (e) => {
    e.stopPropagation();
    console.log(projectUsers);
  };
  const handleDeleteProject = () => {
    if (window.confirm("Are you sure you want to remove this Project?")) {
      deleteProject(project.id);
    }
  };
  const projectOptions = [
    {
      key: "users",
      label: "Manage Users",
      icon: <UserSwitchOutlined style={{ color: "skyblue" }} />,
      onClick: () => selectProject(project),
    },
    {
      key: "delete",
      label: "Delete Project",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onClick: handleDeleteProject,
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
    />
  );
}
