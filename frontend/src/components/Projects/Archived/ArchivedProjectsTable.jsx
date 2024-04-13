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
import useArchivedProjects from "../../../hooks/useArchivedProjects";

export default function ArchivedProjectsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({}); // [1]

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {
    projects,
    projectsError,
    projectsLoading,
    deleteProject,
    deleteProjectsBulk,
  } = useArchivedProjects();

  const handleViewProject = (project) => {
    console.log("project : ", project);
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const handleDeselectProject = () => {
    setIsModalOpen(false);
    setSelectedProject({});
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tableData = useMemo(() => {
    if (!projects) return [];
    return projects.map((project) => ({
      key: project.id,
      ...project,
      name: project.name,
      eventDate: dayjs(project.eventDate).format("DD/MM/YYYY"),
    }));
  }, [projects]);

  const columns = useMemo(() => {
    return getArchivedProjectsTableColumns({
      deleteProject: deleteProject,
      viewProject: handleViewProject,
    });
  }, [deleteProject]);

  return (
    <Suspense fallback={<Loader />}>
      {!projectsLoading && (
        <>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={tableData}
          />
          <Modal
            open={isModalOpen}
            onCancel={handleDeselectProject}
            footer={null}
            width={800}
            closable={false}
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
