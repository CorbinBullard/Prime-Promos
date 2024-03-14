import { Button, Tabs } from "antd";
import React from "react";
import ProjectCardsContainer from "../components/Projects/ProjectCardsContainer";
import { FolderAddOutlined } from "@ant-design/icons";
import FormModalButton from "../components/UI/FormModalButton";
import CreateProjectForm from "../components/Forms/CreateProjectForm";

import ManageProjectUsers from "../components/Projects/ManageProject";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const { projects, createProject, isLoading, currentProject } = useProjects();

  const items = [
    {
      key: "active",
      label: "Active",
    },
    {
      key: "completed",
      label: "Completed",
    },
    {
      key: "archived",
      label: "Archived",
    },
  ];
  const handleCreateProject = async (form) => {
    await createProject(form);
  };
  console.log(currentProject, "project")
  return (
    <>
      {!isLoading && (
        <>
          <Tabs
            items={items}
            tabBarExtraContent={
              <FormModalButton
                icon={<FolderAddOutlined />}
                type="primary"
                form={CreateProjectForm}
                title="Create New Project"
                submitText="Create"
                onSubmit={handleCreateProject}
              >
                Create New Project
              </FormModalButton>
            }
          />

          <ProjectCardsContainer projects={projects} />
          <ManageProjectUsers project={currentProject} />
        </>
      )}
    </>
  );
}
