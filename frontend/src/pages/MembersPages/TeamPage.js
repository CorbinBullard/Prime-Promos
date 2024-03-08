import React, { useState, useMemo } from "react";
import useTeam from "../../hooks/useTeam";
import { Button, Flex, Modal, Space, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import UserIcon from "../../components/Members/UserIcon";
import MemberOptions from "../../components/Members/MemberOptions";
import MembersTable from "../../components/Members/MembersTable";
import { capitalize } from "../../utils/utilFunctions";
import AddMemberForm from "../../components/Members/AddMemberForm";
import AddMemberModal from "../../components/Members/AddMemberModal";

export default function TeamPage() {
  const { teamMembers, addMember } = useTeam();
  const [openModal, setOpenModal] = useState(false);

  const handleInvite = (values) => {
    addMember(values);
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
      <MembersTable members={teamMembers} />
      <AddMemberModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
