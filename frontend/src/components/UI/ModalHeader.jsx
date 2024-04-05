import React from "react";
import { Divider, Typography } from "antd";
const { Title } = Typography;
export default function ModalHeader({ title }) {
  return (
    <>
      <Title level={4} style={{margin: ".6rem"}}>{title}</Title>
      <Divider />
    </>
  );
}
