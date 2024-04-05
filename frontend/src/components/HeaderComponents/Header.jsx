import { Breadcrumb, Flex, Typography } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/utilFunctions";
import UserIcon from "../Members/UserIcon";
import { useSession } from "../../context/Session";
import AccountDropdown from "./AccountDropdown";
const { Title, Paragraph, Text } = Typography;

export default function HeaderBreadcrumb() {
  const { user } = useSession();
  const location = useLocation();
  const path = location.pathname.split("/")[1] || "dashboard";

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ width: "100%", margin: "0 2rem" }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        {capitalize(path)}
      </Title>
      <Flex gap={5}>
        <AccountDropdown user={user} />
      </Flex>
    </Flex>
  );
}
