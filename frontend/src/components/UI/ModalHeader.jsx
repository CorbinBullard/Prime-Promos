import React from "react";
import { Divider, Flex, Typography } from "antd";
import { capitalize } from "../../utils/utilFunctions";
const { Title } = Typography;

// Main parent component
const ModalHeader = ({ children }) => {
  return (
    <>
      <Flex gap={15} align="center">{children}</Flex>
      <Divider />
    </>
  );
};

// Sub-component for the title
ModalHeader.Title = ({ title }) => (
  <Title level={4} style={{ margin: ".6rem" }}>
    {capitalize(title)}
  </Title>
);

// Sub-component for an icon, if needed
ModalHeader.Icon = ({ Icon, iconProps }) => <Icon {...iconProps} />;

// Exporting the compound component
export default ModalHeader;
