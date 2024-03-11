import React from "react";
import { Button, Dropdown, Menu } from "antd";
import {
  MenuOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import OptionsButton from "../UI/OptionsButton";
import { useTeam } from "../../context/Members";

function MemberOptions({ user, dispatch }) {
  const { deleteMember, reinvite } = useTeam();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      deleteMember(id);
    }
  };

  const dropdownOptions = [
    {
      key: "edit",
      label: "Change Permissions",
      icon: <EditOutlined style={{ color: "skyblue" }} />,
      onClick: () => console.log("Edit"),
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
      onClick: () => handleDelete(user.id),
    },
  ];

  return OptionsButton({ items: dropdownOptions });
}

export default React.memo(MemberOptions, (prevProps, nextProps) => {
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.validated === nextProps.user.validated
  );
});
