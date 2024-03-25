import React from "react";
import CreateProjectForm from "../../../Forms/CreateProjectForm";
import { useProjects } from "../../../../hooks/useProjects";
import { Button, Form } from "antd";

export default function EditProjectTab({ project }) {
  const { updateProject } = useProjects();
  const [form] = Form.useForm();

  const handleUpdateProject = async () => {
    form.validateFields().then((values) => {
      updateProject(values);
    });
  };
  return (
    <>
      <CreateProjectForm form={form} initialValues={project} />
      <Button type="primary" onClick={handleUpdateProject}>Update Project</Button>
    </>
  );
}
