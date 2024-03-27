import Avatar from "antd/es/avatar/avatar";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

export default function UserIcon({ icon, user }) {
  console.log("UserIcon: ", user);
  if (user?.profileImageUrl) {
    return <Avatar size={"large"} src={user.profileImageUrl} />;
  }
  return <Avatar size="large" icon={<UserOutlined />} />;
}
