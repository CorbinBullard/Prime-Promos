import React, { Suspense, useMemo, useState } from "react";
import { Table } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { capitalize } from "../../../utils/utilFunctions";
import { useSession } from "../../../context/Session";
import { csrfFetch } from "../../../utils/csrf";
import { useNotification } from "../../../context/Notification";
import Loader from "../../UI/Loader";
import dayjs from "dayjs";
import { getArchivedProjectsTableColumns } from "./ArchivedProjectOptions";
import ArchivedProjectPDF from "./ArchivedProjectPDF";
import { PDFViewer } from "@react-pdf/renderer";

export default function ArchivedProjectsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({}); // [1]

  const { user, isAdmin } = useSession();
  const queryClient = useQueryClient();
  const openNotification = useNotification();

  const handleViewProject = (project) => {
    console.log("project : ", project);
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const handleDeselectProject = () => {
    setIsModalOpen(false);
    setSelectedProject({});
  };

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading,
  } = useQuery({
    queryKey: ["archivedProjects"],
    queryFn: async () => {
      const response = await csrfFetch("/api/projects/archived");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
    enabled: !!user && isAdmin,
  });
  // delete archived project
  const deleteProjectMutation = useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: async (projectId) => {
      const response = await csrfFetch(`/api/projects/${projectId}/archived`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Failed to delete project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["archivedProjects"]);
      openNotification({
        message: "Success",
        description: "Project deleted successfully",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: "Error",
        description: error.message,
        type: "error",
      });
    },
  });
  const tableData = useMemo(() => {
    if (!projects) return [];
    return projects.map((project) => ({
      ...project,
      name: project.name,
      eventDate: dayjs(project.eventDate).format("DD/MM/YYYY"),
    }));
  }, [projects]);

  const columns = useMemo(() => {
    return getArchivedProjectsTableColumns({
      deleteProject: deleteProjectMutation.mutate,
      viewProject: handleViewProject,
    });
  }, [deleteProjectMutation.mutate]);

  return (
    <Suspense fallback={<Loader />}>
      {!projectsLoading && (
        <>
          <Table columns={columns} dataSource={tableData} />
          <Modal
            open={isModalOpen}
            onCancel={handleDeselectProject}
            footer={null}
            width={800}
          >
            {!!selectedProject && (
              <PDFViewer style={{ width: "100%", height: "45rem" }}>
                <ArchivedProjectPDF project={selectedProject} />
              </PDFViewer>
            )}
          </Modal>
        </>
      )}
    </Suspense>
  );
}
