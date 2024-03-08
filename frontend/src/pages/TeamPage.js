import React, { useState, useMemo } from "react";
import useTeam from "../hooks/Team/useTeam";
import { Button, Flex, Modal, Space, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import UserIcon from "../components/Team/UserIcon";
import MemberOptions from "../components/Team/MemberOptions";
import MembersTable from "../components/Team/MembersTable";
import { capitalize } from "../utils/utilFunctions";
import AddMemberForm from "../components/Team/AddMemberForm";
import AddMemberModal from "../components/Team/AddMemberModal";

export default function TeamPage() {
  const [members, dispatch] = useTeam();
  const [openModal, setOpenModal] = useState(false);

  const handleInvite = (values) => {
    dispatch({ type: "INVITE_MEMBER", payload: values });
    setOpenModal(false);
  };

  return (
    <div>
      <Flex align="center" justify="space-between">
        <h1>My Team</h1>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <UserAddOutlined />
          Invite Member
        </Button>
      </Flex>
      <MembersTable members={members} />
      <AddMemberModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
