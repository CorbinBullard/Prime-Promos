import { Button, Tabs } from "antd";
import React from "react";
import ProjectCardsContainer from "../components/Projects/ProjectCardsContainer";
import { FolderAddOutlined } from "@ant-design/icons";
import FormModalButton from "../components/UI/FormModalButton";
import CreateProjectForm from "../components/Forms/CreateProjectForm";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Project 1",
      description: "Description for Project 1",
    },
    {
      id: 2,
      name: "Project 2",
      description: "Description for Project 2",
    },
    {
      id: 3,
      name: "Project 3",
      description: "Description for Project 3",
    },
  ];
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
  const handleCreateProject = () => {
    console.log("Create Project");
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
          >
            Create New Project
          </FormModalButton>
        }
      />
      <ProjectCardsContainer projects={projects} />
    </>
  );
}
