import React from "react";
import CreateProjectForm from "../../../Forms/CreateProjectForm";
import { useProjects } from "../../../../hooks/useProjects";
import { Button, Divider, Flex, Form, Progress, Tag, message } from "antd"; // Import message for feedback
import { capitalize } from "../../../../utils/utilFunctions";
import {
  ItemStatusColors,
  ItemStatusProgression,
} from "../../../../utils/constants";
import ProjectItemStatus from "../../ProjectItemStatus";
import ProjectStatusSection from "./ProjectStatusSection";
import Profits from "./Profits";

export default function EditProjectTab({ project }) {
  const { updateProject } = useProjects();
  const [form] = Form.useForm();

  const handleUpdateProject = async () => {
    try {
      // Validate fields and attempt to update project
      const values = await form.validateFields();
      await updateProject({ id: project.id, ...values });
      // message.success("Project updated successfully"); // Show success message
    } catch (error) {
      console.error(error);
      // Handle validation errors from form.validateFields()
    }
  };

  return (
    <>
      <Divider>Project Details</Divider>
      <Flex vertical>
        <CreateProjectForm form={form} initialValues={project} />
        <Button type="primary" onClick={handleUpdateProject}>
          Update Project
        </Button>
      </Flex>
      <Divider>Project Status</Divider>
      <ProjectStatusSection project={project} />
    </>
  );
}
