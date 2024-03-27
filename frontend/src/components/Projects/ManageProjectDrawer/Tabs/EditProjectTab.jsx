import React from "react";
import CreateProjectForm from "../../../Forms/CreateProjectForm";
import { useProjects } from "../../../../hooks/useProjects";
import { Button, Form, message } from "antd"; // Import message for feedback

export default function EditProjectTab({ project }) {
  const { updateProject } = useProjects();
  const [form] = Form.useForm();

  const handleUpdateProject = async () => {
    try {
      // Validate fields and attempt to update project
      const values = await form.validateFields();
      console.log({ id: project.id, ...values });
      await updateProject({ id: project.id, ...values });
      // message.success("Project updated successfully"); // Show success message
    } catch (error) {
      console.error(error);
      // Handle validation errors from form.validateFields()
    }
  };

  return (
    <>
      <CreateProjectForm form={form} initialValues={project} />
      <Button type="primary" onClick={handleUpdateProject}>
        Update Project
      </Button>
    </>
  );
}
