import { Button, Dropdown, Flex, Typography } from "antd";
import React from "react";
import UserIcon from "../Members/UserIcon";
import { DownOutlined } from "@ant-design/icons";
const { Title } = Typography;
export default function AccountDropdown({ user }) {
  const items = [
    {
      label: "My Profile",
      key: "0",
    },
    {
      label: "Logout",
      key: "1",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        type="text"
        style={{ height: "100%" }}
        children={
          <Flex align="center">
            <UserIcon user={user} />
            <Flex vertical>
              <Title level={5} style={{ margin: "0 1rem" }}>
                Welcome,
              </Title>
              <Title level={5} italic style={{ margin: "0 1rem" }}>
                {user?.firstName} {user?.lastName}
              </Title>
            </Flex>
            <DownOutlined />
          </Flex>
        }
      />
    </Dropdown>
  );
}
