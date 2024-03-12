import { Button, Tabs } from "antd";
import React from "react";
import ProjectCardsContainer from "../components/Projects/ProjectCardsContainer";
import { FolderAddOutlined } from "@ant-design/icons";
import FormModalButton from "../components/UI/FormModalButton";
import CreateProjectForm from "../components/Forms/CreateProjectForm";
import { useProjectActions } from "../hooks/Projects/useProjectActions";
import { useProjectsState } from "../hooks/Projects/useProjectsState";
import ManageProjectUsers from "../components/Projects/ManageProject";

export default function ProjectsPage() {
  const { projects, currentProject, dispatch } = useProjectsState();
  const { createProject } = useProjectActions(dispatch);

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

  return (
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
      <ProjectCardsContainer projects={projects} dispatch={dispatch} />
      {/* Drawer */}

      <ManageProjectUsers project={currentProject} dispatch={dispatch} />
    </>
  );
}
