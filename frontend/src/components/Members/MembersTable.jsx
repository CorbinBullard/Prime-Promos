import React, { useMemo } from "react";
import MemberOptions from "./MemberOptions";
import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import UserIcon from "./UserIcon";
import { Avatar, Table, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils/utilFunctions";
import OptionsButton from "../UI/OptionsButton";
import { useTeam } from "../../context/useTeam";

export default function MembersTable({ members, selectMember }) {
  const { deleteMember, reinvite } = useTeam();

  const UserOptions = (user) => [
    {
      key: "edit",
      label: "Edit User",
      icon: <EditOutlined style={{ color: "skyblue" }} />,
      onClick: () => selectMember(user),
    },
    {
      key: "resend",
      label: "Resend Invite",
      icon: <SendOutlined style={{ color: "skyblue" }} />,
      disabled: user.validated === "Active",
      onClick: () => reinvite(user.id),
    },
    {
      key: "delete",
      label: "Remove Member",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onClick: () =>
        Modal.confirm({
          title: "Remove Member",
          content: "Are you sure you want to remove this member?",
          onOk: () => deleteMember(user.id),
        }),
    },
  ];

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
        return record.validated === value;
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <OptionsButton items={UserOptions(record)} />
        // <MemberOptions user={record} dispatch={dispatch} />
      ),
    },
  ];
  const tableData = useMemo(() => {
    return Object.values(members).map((member) => {
      return {
        ...member,
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
