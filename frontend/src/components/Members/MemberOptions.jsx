import { Button, Popconfirm, Popover } from "antd";
import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import useTeam from "../../hooks/useTeam";

export default function MemberOptions({ user }) {
  const handleClick = () => {
    console.log("User: ", user);
  };
  return (
    <Popover
      content={<MemberOptionsPopoverContent user={user} />}
      trigger="click"
    >
      <Button onClick={handleClick} type="text">
        <MenuOutlined />
      </Button>
    </Popover>
  );
}
// Maybe Replace with Member Details page
function MemberOptionsPopoverContent({ user }) {
  const { deleteMember } = useTeam();
  const handleDelete = () => {
    console.log("User: ", user);
    deleteMember(user.id);
  };
  return (
    <Popconfirm
      title="Delete User?"
      description="Are you sure to delete this User?"
      onConfirm={handleDelete}
      okText="Confirm Delete"
      cancelText="Cancel"
    >
      <Button danger>Delete</Button>;
    </Popconfirm>
  );
}
