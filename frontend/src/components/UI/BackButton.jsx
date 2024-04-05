import React from "react";
import { Button } from "antd";
import { LeftCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = ({ text, ...props }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <Button onClick={handleClick} {...props}>
      <LeftCircleTwoTone />
      {text || "Back"}
    </Button>
  );
};

export default BackButton;