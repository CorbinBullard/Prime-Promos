import React from "react";
import { Avatar, Modal } from "antd";
import {
  UserOutlined,
  EditOutlined,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import UserIcon from "./UserIcon"; // Update the path as necessary
import OptionsButton from "../UI/OptionsButton"; // Update the path as necessary

/**
 * Generates columns for the MembersTable.
 * @param {Object} dependencies - Contains all dependencies like components and callback functions.
 * @returns {Array} Columns configuration for Ant Design's Table.
 */
export const generateUserOptions = (
  user,
  { selectMember, reinvite, handleDelete }
) => [
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
    disabled: user.validated === "Active", // Assuming 'validated' indicates if the user is active
    onClick: () => reinvite(user.id),
  },
  {
    key: "delete",
    label: "Remove Member",
    icon: <DeleteOutlined style={{ color: "red" }} />,
    onClick: () => handleDelete(user.id),
  },
];

export const getColumns = ({
  UserIcon,
  OptionsButton,
  selectMember,
  reinvite,
  handleDelete,
}) => [
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
      { text: "Admin", value: "Admin" },
      { text: "User", value: "User" },
    ],
    onFilter: (value, record) => record.role === value,
    sorter: (a, b) => (a.role === "Admin" && b.role === "User" ? 1 : -1),
    defaultSortOrder: "descend",
  },
  {
    title: "Status",
    dataIndex: "validated",
    key: "validated",
    filters: [
      { text: "Active", value: "Active" },
      { text: "Pending", value: "Pending" },
    ],
    onFilter: (value, record) => record.validated === value,
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <OptionsButton
        items={generateUserOptions(record, {
          selectMember,
          reinvite,
          handleDelete,
        })}
      />
    ),
  },
];
