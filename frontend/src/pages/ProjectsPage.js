import { Button, Tabs } from "antd";
import React, { useState } from "react";
import ProjectCardsContainer from "../components/Projects/ProjectCardsContainer";
import { FolderAddOutlined } from "@ant-design/icons";
import FormModalButton from "../components/UI/FormModalButton";
import CreateProjectForm from "../components/Forms/CreateProjectForm";
import ManageProjectDrawer from "../components/Projects/ManageProjectDrawer";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const { projects, createProject, isLoading } = useProjects();
  const [selectedProjected, setSelectedProject] = useState(null);

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

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };
  const handleDeselectProject = () => {
    setSelectedProject(null);
  };
  console.log("project", selectedProjected);
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
          <ProjectCardsContainer
            projects={projects}
            selectProject={handleSelectProject}
          />
          <ManageProjectDrawer
            project={selectedProjected}
            deselectProject={handleDeselectProject}
          />
        </>
      )}
    </>
  );
}
