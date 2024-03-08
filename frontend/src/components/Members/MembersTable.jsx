import React, { useMemo } from "react";
import MemberOptions from "./MemberOptions";
import UserIcon from "./UserIcon";
import { Avatar, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils/utilFunctions";

const columns = [
  {
    title: <Avatar icon={<UserOutlined />} />,
    dataIndex: "icon",
    key: "icon",
    render: (text, record) => <UserIcon icon={record.icon} user={record} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    filters: [
      {
        text: "Admin",
        value: "Admin",
      },
      {
        text: "User",
        value: "User",
      },
    ],
    onFilter: (value, record) => {
      console.log("Record: ", record, "Value: ", value);
      return record.role === value;
    },
    sorter: (a, b) => (a.role === "Admin" && b.role === "User" ? 1 : -1),
    defaultSortOrder: "descend",
  },
  {
    title: "Status",
    dataIndex: "validated",
    key: "validated",
    filters: [
      {
        text: "Active",
        value: "Active",
      },
      {
        text: "Pending",
        value: "Pending",
      },
    ],
    onFilter: (value, record) => {
      console.log("Record: ", record, "Value: ", value);
      return record.validated === value;
    },
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => <MemberOptions user={record} />,
  },
];
export default function MembersTable({ members }) {
  const tableData = useMemo(() => {
    return Object.values(members).map((member) => {
      return {
        id: member.id,
        key: member.id,
        name: `${member.firstName} ${member.lastName}`,
        email: member.email,
        role: capitalize(member.role),
        validated: member.validated ? "Active" : "Pending",
      };
    });
  }, [members]);
  return <Table columns={columns} dataSource={tableData} />;
}
