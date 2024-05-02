import { Flex, Typography } from "antd";
import React from "react";
import dayjs from "dayjs";
import { capitalize } from "../../utils/utilFunctions";
const { Title, Text } = Typography;

export default function ProjectTitle({ project }) {
  return (
    <Flex align="center" gap={10}>
      <Flex vertical justify="center" align="start">
        <Title level={3} style={{ margin: "0" }}>
          {capitalize(project?.name)}
        </Title>
        <Text italic strong style={{ margin: "0", color: "#8c8c8c" }}>
          {capitalize(project?.organizationName)} -{" "}
          {capitalize(project?.contactName)}
        </Text>
      </Flex>
      <Flex vertical align="start">
        {project?.inHandsDate && (
          <Text italic style={{ margin: "0 10px", color: "#8c8c8c" }}>
            In Hands Date: {dayjs(project?.inHandsDate).format("MMM, DD")}
          </Text>
        )}
        {project?.eventDate && (
          <Text italic style={{ margin: "0 10px", color: "#8c8c8c" }}>
            Event Date: {dayjs(project?.eventDate).format("MMM, DD")}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
