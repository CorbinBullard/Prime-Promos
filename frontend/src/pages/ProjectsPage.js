import { Button, Tabs } from "antd";
import React, { useMemo, useState } from "react";
import ProjectCardsContainer from "../components/Projects/ProjectCardsContainer";
import { FolderAddOutlined } from "@ant-design/icons";
import FormModalButton from "../components/UI/FormModalButton";
import CreateProjectForm from "../components/Forms/CreateProjectForm";
import ManageProjectDrawer from "../components/Projects/ManageProjectDrawer";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const {
    projects,
    createProject,
    isLoading,
    selectProject,
    currentProjectId,
    clearCurrentProject,
  } = useProjects();

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

  const projectsObj = useMemo(() => {
    if (!projects) return {};
    return projects?.reduce((acc, project) => {
      acc[project.id] = project
      return acc;
    }, {});
  }
  , [projects]);

  const handleCreateProject = async (form) => {
    await createProject(form);
  };
  
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
            selectProject={selectProject}
          />
          <ManageProjectDrawer
            project={projectsObj[currentProjectId] || null}
            deselectProject={clearCurrentProject}
          />
        </>
      )}
    </>
  );
}
