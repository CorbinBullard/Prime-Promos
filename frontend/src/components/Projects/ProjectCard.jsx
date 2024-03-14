import { Avatar, Card, Flex } from "antd";
import { DeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import React from "react";
import UserIcon from "../Members/UserIcon";
import OptionsButton from "../UI/OptionsButton";
import { useProjects } from "../../hooks/useProjects";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, selectProject }) {
  const { deleteProject } = useProjects();
  const navigate = useNavigate();
  const projectUsers = project.Users;
  const handleProjectSelect = () => {
    navigate(`/projects/${project.id}`);
  };
  const handleProjectOptionsSelect = () => {
    // e.stopPropagation();
    selectProject(project);
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
      onClick: handleProjectOptionsSelect,
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
      extra={
        <Flex align="center" gap={2}>
          <Avatar.Group size="small" maxCount={4}>
            {projectUsers.map((user) => (
              <UserIcon key={user.id} user={user} />
            ))}
          </Avatar.Group>
          <OptionsButton items={projectOptions} />
        </Flex>
      }
      // actions={[<div onClick={handleProjectUserSelect}>View Users</div>]}
    />
  );
}
