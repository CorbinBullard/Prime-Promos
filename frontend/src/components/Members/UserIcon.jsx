import Avatar from "antd/es/avatar/avatar";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

export default function UserIcon({ icon, user, size }) {
  if (user?.profileImageUrl) {
    return <Avatar size={size || "large"} src={user.profileImageUrl} />;
  }
  return <Avatar size={size || "large"} icon={<UserOutlined />} />;
}
