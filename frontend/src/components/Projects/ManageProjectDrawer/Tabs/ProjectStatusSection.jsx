import React from "react";
import { Progress, Flex, Tag, Button, Modal } from "antd";
import {
  ItemStatusColors,
  ItemStatusProgression,
} from "../../../../utils/constants";
import { useProjects } from "../../../../hooks/useProjects";
import ProjectItemStatus from "../../ProjectItemStatus";
import { pdf } from "@react-pdf/renderer";
import ProjectPDF from "../../PDF/ProjectPDF";
import moment from "moment";
import dayjs from "dayjs";

export default function ProjectStatusSection({ project }) {
  const { markProjectAsCompleted, archiveProject, revertProjectToActive } =
    useProjects();

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
            const file = await pdf(<ProjectPDF project={project} />).toBlob();
            console.log("blob", file); // Confirm the blob is created correctly.
            const formData = new FormData();
            await formData.append(
              "file",
              file,
              `${project.eventDate || dayjs().format("YYYY-MM-DD")}` +
                "_" +
                project.name +
                ".pdf"
            );

            // Ensure formData is ready and then call the archiveProject
            console.log("formData", formData); // Confirm the formData is created correctly.
            archiveProject(project.id, formData);
          } catch (error) {
            console.error("Error creating PDF or uploading file:", error);
          }
        },
      });
    }
  };
  const handleRevertProjectToActive = async () => {
    try {
      Modal.confirm({
        title: "Revert Project to Active",
        content: "Are you sure you want to revert this project to active?",
        onOk: async () => {
          try {
            await revertProjectToActive(project.id);
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex vertical gap={15}>
      {project.Items.map((item) => (
        <ProjectItemStatus key={item.id} item={item} />
      ))}
      <Flex style={{ width: "100%" }} gap={10}>
        {project.status === "completed" && (
          <Button
            onClick={handleRevertProjectToActive}
            style={{ width: "100%" }}
          >
            Revert Project To Active
          </Button>
        )}
        <Button
          type="primary"
          danger={project.status === "completed"}
          disabled={!project.Items.every((item) => item.status === "delivered")}
          onClick={handleUpdateProjectStatus}
          style={{ width: "100%" }}
        >
          {project.status === "active" && "Mark Project as Completed"}
          {project.status === "completed" && "Archive Project"}
        </Button>
      </Flex>
    </Flex>
  );
}
