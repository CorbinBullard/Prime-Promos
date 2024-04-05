import React from "react";
import { Progress, Flex, Tag, Button } from "antd";
import {
  ItemStatusColors,
  ItemStatusProgression,
} from "../../../../utils/constants";
import { capitalize } from "../../../../utils/utilFunctions";
import { useProjects } from "../../../../hooks/useProjects";
import ProjectItemStatus from "../../ProjectItemStatus";

export default function ProjectStatusSection({ project }) {
  const { markProjectAsCompleted } = useProjects();

  const handleUpdateProjectStatus = async () => {
    if (project.status === "active") {
      try {
        await markProjectAsCompleted(project.id);
        // message.success("Project marked as completed"); // Show success message
      } catch (error) {
        console.error(error);
        // Handle validation errors from form.validateFields()
      }
    }
  };
  console.log(project);
  return (
    <Flex vertical gap={15}>
      {project.Items.map((item) => (
        <ProjectItemStatus key={item.id} item={item} />
      ))}
      <Button
        type="primary"
        disabled={!project.Items.every((item) => item.status === "delivered")}
        onClick={handleUpdateProjectStatus}
      >
        {project.status === "active" && "Mark Project as Completed"}
        {project.status === "completed" && "Archive Project"}
      </Button>
    </Flex>
  );
}
