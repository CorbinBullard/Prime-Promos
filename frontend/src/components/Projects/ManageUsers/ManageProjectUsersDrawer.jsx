import { Drawer, Table } from "antd";
import React, { useState } from "react";
import { useTeam } from "../../../context/Members";
import { useProjectActions } from "../../../hooks/Projects/useProjectActions";

export default function ManageProjectUsers({ project, dispatch }) {
  const { teamMembers } = useTeam();
  const { resetCurrentProject } = useProjectActions(dispatch);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const tableColumns = [
    {
      title: "User",
      dataIndex: "user",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  console.log("Team Members: ", teamMembers);
  return (
    <Drawer open={project !== null} onClose={resetCurrentProject} width={800}>
      <>
        {project && <h1>{project.name}</h1>}
        <Table columns={tableColumns} />
      </>
    </Drawer>
  );
}
