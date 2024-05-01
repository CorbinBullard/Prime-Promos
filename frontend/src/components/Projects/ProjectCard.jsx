import { Avatar, Card, Flex, List, Modal, Progress, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import React from "react";
import UserIcon from "../Members/UserIcon";
import OptionsButton from "../UI/OptionsButton";
import { useProjects } from "../../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import { ItemStatusColors } from "../../utils/constants";
import { useSession } from "../../context/Session";
import { capitalize } from "../../utils/utilFunctions";
import ProjectItemStatus from "./ProjectItemStatus";

export default function ProjectCard({ project, selectProject }) {
  const { deleteProject } = useProjects();
  const { isAdmin, isOwner } = useSession();
  const navigate = useNavigate();
  const projectUsers = project.Users;
  const handleProjectSelect = () => {
    navigate(`/projects/${project.id}`);
  };
  const handleProjectOptionsSelect = () => {
    selectProject(project);
  };
  const handleDeleteProject = () => {
    deleteProject(project.id);
  };

  const projectOptions = [
    {
      key: "edit",
      label: "Edit Project",
      icon: <EditOutlined style={{ color: "skyblue" }} />,
      onClick: handleProjectOptionsSelect,
    },
    {
      key: "profits",
      label: "Profits",
      icon: <MoneyCollectOutlined style={{ color: "lime" }} />,
      onClick: () => navigate(`/projects/${project.id}/profits`),
      disabled: !isOwner,
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
  return (
    <Card
      title={capitalize(project.name)}
      bordered={false}
      hoverable
      onClick={handleProjectSelect}
      style={{ width: 500, minWidth: 300 }}
      extra={
        isAdmin && (
          <Flex align="center" gap={2}>
            <Avatar.Group size="small" maxCount={4}>
              {projectUsers.map((user) => (
                <UserIcon key={user.id} user={user} />
              ))}
            </Avatar.Group>
            <OptionsButton items={projectOptions} />
          </Flex>
        )
      }
    >
      <List
        size="small"
        dataSource={project.Items}
        renderItem={(item) => (
          <List.Item style={{ display: "flex" }} key={item.name}>
            <ProjectItemStatus
              item={item}
              key={item.id}
              style={{ justifyContent: "space-between" }}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
