import Avatar from "antd/es/avatar/avatar";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

export default function UserIcon({ icon, user }) {
  return <Avatar icon={<UserOutlined />} />;
}
