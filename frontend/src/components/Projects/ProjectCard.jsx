import { Avatar, Card, Flex, List, Modal, Progress, Tag } from "antd";
import { DeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import React from "react";
import UserIcon from "../Members/UserIcon";
import OptionsButton from "../UI/OptionsButton";
import { useProjects } from "../../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import { ItemStatusColors } from "../../utils/constants";

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
    deleteProject(project.id);
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
      onClick: () =>
        Modal.confirm({
          title: "Delete Project",
          content: "Are you sure you want to delete this project?",
          onOk: handleDeleteProject,
        }),
    },
  ];
  console.log(project);
  return (
    <Card
      title={project.name}
      bordered={false}
      hoverable
      onClick={handleProjectSelect}
      style={{ width: 500, minWidth: 300 }}
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
    >
      <List
        size="small"
        dataSource={project.Items}
        renderItem={(item) => (
          <List.Item
            style={{ display: "flex" }}
            key={item.name}
            extra={
              <>
                <Tag color={ItemStatusColors[item.status]}>{item.status}</Tag>
              </>
            }
          >
            <List.Item.Meta title={item.name} />
          </List.Item>
        )}
      />
    </Card>
  );
}
