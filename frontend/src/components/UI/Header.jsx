import { Breadcrumb, Flex, Typography } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/utilFunctions";
import UserIcon from "../Members/UserIcon";
import { useSession } from "../../context/Session";
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
      </Flex>
    </Flex>
  );
}
