import { Tabs } from "antd";
import React, { useMemo } from "react";
import ProjectCardsContainer from "../components/Projects/ProjectCardsContainer";
import { FolderAddOutlined } from "@ant-design/icons";
import FormModalButton from "../components/UI/FormModalButton";
import CreateProjectForm from "../components/Forms/CreateProjectForm";
import { useProjects } from "../hooks/useProjects";
import DrawerManager from "../components/UI/DrawerManager";
import { projectManagerTabs } from "../components/Projects/ManageProjectDrawer/ProjectManager";
import { useSession } from "../context/Session";
import ArchivedProjectsTable from "../components/Projects/Archived/ArchivedProjectsTable";

export default function ProjectsPage() {
  const {
    projects,
    createProject,
    isLoading,
    selectProject,
    currentProjectId,
    clearCurrentProject,
  } = useProjects();
  const { isAdmin } = useSession();

  console.log("Projects Page : ", projects);

  const projectsObj = useMemo(() => {
    if (!projects) return {};
    return projects?.reduce((acc, project) => {
      acc[project.id] = project;
      return acc;
    }, {});
  }, [projects]);

  console.log("Projects Page Obj: ", projectsObj);

  const handleCreateProject = async (form) => {
    await createProject(form);
  };

  const items = [
    {
      key: "active",
      label: "Active",
      children: (
        <ProjectCardsContainer
          projects={projects?.filter((project) => project.status === "active")}
          selectProject={selectProject}
        />
      ),
    },
    {
      key: "completed",
      label: "Completed",
      children: (
        <ProjectCardsContainer
          projects={projects?.filter(
            (project) => project.status === "completed"
          )}
          selectProject={selectProject}
        />
      ),
    },
    ...(isAdmin
      ? [
          {
            key: "archived",
            label: "Archived",
            children: <ArchivedProjectsTable />,
          },
        ]
      : []),
  ];
  console.log("Items: ", items);
  return (
    <>
      {!isLoading && (
        <>
          <Tabs
            items={items}
            tabBarExtraContent={
              isAdmin && (
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
              )
            }
          />

          <DrawerManager
            open={!!currentProjectId}
            onClose={clearCurrentProject}
            item={projectsObj[currentProjectId]}
            tabItems={projectManagerTabs(projectsObj[currentProjectId])}
          />
        </>
      )}
    </>
  );
}
