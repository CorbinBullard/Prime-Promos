import { Button } from "antd";
import React from "react";
import { MenuOutlined } from "@ant-design/icons";

export default function MemberOptions({ record }) {
  const handleClick = () => {
    
  };
  return (
    <Button onClick={handleClick} type="text">
      <MenuOutlined />
    </Button>
  );
}
