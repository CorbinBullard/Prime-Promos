import React, { useMemo, useCallback } from "react";
import { Avatar, Table, Modal } from "antd";
import {
  UserOutlined,
  EditOutlined,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import UserIcon from "./UserIcon";
import OptionsButton from "../UI/OptionsButton";
import { useTeam } from "../../context/useTeam";
import { getColumns } from "./UserOptions"; // Assuming columns are moved to a separate file
import { capitalize } from "../../utils/utilFunctions";

export default function MembersTable({ members, selectMember }) {
  const { deleteMember, reinvite } = useTeam();

  const handleDelete = useCallback(
    (id) => {
      Modal.confirm({
        title: "Remove Member",
        content: "Are you sure you want to remove this member?",
        onOk: () => deleteMember(id),
      });
    },
    [deleteMember]
  );

  // Assume UserOptions is now a utility function imported from elsewhere
  // and it uses useCallback internally for its click handlers

  const tableData = useMemo(
    () =>
      members.map((member) => ({
        ...member,
        key: member.id,
        name: `${member.firstName} ${member.lastName}`,
        email: member.email,
        role: capitalize(member.role),
        validated: member.validated ? "Active" : "Pending",
      })),
    [members]
  );

  const columns = useMemo(
    () =>
      getColumns({
        UserIcon,
        OptionsButton,
        selectMember,
        reinvite,
        handleDelete,
      }),
    [handleDelete, reinvite, selectMember]
  );

  return <Table columns={columns} dataSource={tableData} />;
}
