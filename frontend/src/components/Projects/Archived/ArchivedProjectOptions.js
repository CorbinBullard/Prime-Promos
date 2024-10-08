import React, { useMemo } from "react";
import { Modal } from "antd";
import { FilePdfOutlined, DeleteOutlined } from "@ant-design/icons";
import OptionsButton from "../../UI/OptionsButton";
import dayjs from "dayjs";

const generateArchivedProjectOptions = (
  project,
  { deleteProject, viewProject }
) => [
  {
    key: "view",
    label: "View Project PDF",
    icon: <FilePdfOutlined style={{ color: "skyblue" }} />,
    onClick: () => {
      // console.log("View Project PDF", project);
      viewProject(project);
    },
  },
  {
    key: "delete",
    label: "Delete Project",
    icon: <DeleteOutlined style={{ color: "red" }} />,
    onClick: () =>
      Modal.confirm({
        title: "Delete Project",
        content: "Are you sure you want to delete this project?",
        onOk: () => deleteProject(project.id),
      }),
  },
];

export const getArchivedProjectsTableColumns = ({
  deleteProject,
  viewProject,
}) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Event Date",
    dataIndex: "eventDate",
    key: "eventDate",
    sorter: (a, b) => {
      const aTime = +dayjs(a.eventDate, "DD/MM/YYYY").format("YYYYMMDD");
      const bTime = +dayjs(b.eventDate, "DD/MM/YYYY").format("YYYYMMDD");
      return aTime - bTime;
    },
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => {
      return (
        <OptionsButton
          items={generateArchivedProjectOptions(record, {
            deleteProject,
            viewProject,
          })}
        />
      );
    },
  },
];
