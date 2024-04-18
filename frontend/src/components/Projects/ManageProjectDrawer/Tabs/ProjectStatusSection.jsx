import React from "react";
import { Progress, Flex, Tag, Button, Modal } from "antd";
import {
  ItemStatusColors,
  ItemStatusProgression,
} from "../../../../utils/constants";
import { useProjects } from "../../../../hooks/useProjects";
import ProjectItemStatus from "../../ProjectItemStatus";

export default function ProjectStatusSection({ project }) {
  const { markProjectAsCompleted, archiveProject } = useProjects();

  const handleUpdateProjectStatus = async () => {
    if (project.status === "active") {
      try {
        Modal.confirm({
          title: "Mark Project as Completed",
          content: "Are you sure you want to mark this project as complete?",
          onOk: async () => {
            try {
              await markProjectAsCompleted(project.id);
            } catch (error) {
              console.error(error);
            }
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (project.status === "completed") {
      Modal.confirm({
        title: "Archive Project",
        content: "Are you sure you want to archive this project?",
        onOk: async () => {
          try {
            await archiveProject(project.id);
          } catch (error) {
            console.error(error);
          }
        },
      });
    }
  };
  return (
    <Flex vertical gap={15}>
      {project.Items.map((item) => (
        <ProjectItemStatus key={item.id} item={item} />
      ))}
      <Button
        type="primary"
        danger={project.status === "completed"}
        disabled={!project.Items.every((item) => item.status === "delivered")}
        onClick={handleUpdateProjectStatus}
      >
        {project.status === "active" && "Mark Project as Completed"}
        {project.status === "completed" && "Archive Project"}
      </Button>
    </Flex>
  );
}
