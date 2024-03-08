import { Button, Modal, Popconfirm, Popover } from "antd";
import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import useTeam from "../../hooks/useTeam";

export default function MemberOptions({ user }) {
  const handleClick = () => {
    console.log("User: ", user);
  };
  return (
    <>
      <Button onClick={handleClick} type="text">
        <MenuOutlined />
      </Button>
      <Modal>
        
      </Modal>
    </>
  );
}
