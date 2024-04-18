import React, { Suspense, useMemo, useState } from "react";
import { Table, Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Loader from "../../UI/Loader";
import dayjs from "dayjs";
import { getArchivedProjectsTableColumns } from "./ArchivedProjectOptions";
import ArchivedProjectPDF from "./ArchivedProjectPDF";
import { PDFViewer } from "@react-pdf/renderer";
import useArchivedProjects from "../../../hooks/useArchivedProjects";

export default function ArchivedProjectsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { projects, projectsLoading, deleteProjectsBulk, deleteProject } =
    useArchivedProjects();

  const handleBulkDelete = () => {
    Modal.confirm({
      title: "Delete Projects",
      content: "Are you sure you want to delete these projects?",
      onOk: () => {
        deleteProjectsBulk(selectedRowKeys);
        setSelectedRowKeys([]);
      },
    });
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeselectProject = () => {
    setIsModalOpen(false);
    setSelectedProject({});
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tableData = useMemo(
    () =>
      projects?.map((project) => ({
        key: project.id,
        ...project,
        name: project.name,
        eventDate: dayjs(project.eventDate).format("DD/MM/YYYY"),
      })) || [],
    [projects]
  );

  const columns = useMemo(
    () =>
      getArchivedProjectsTableColumns({
        deleteProject,
        viewProject: handleViewProject,
      }),
    []
  );

  return (
    <Suspense fallback={<Loader />}>
      <Button
        danger
        onClick={handleBulkDelete}
        disabled={!selectedRowKeys.length}
      >
        <DeleteOutlined />
      </Button>

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
            {selectedProject && (
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
