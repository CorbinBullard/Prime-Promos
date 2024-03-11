import React, { useState, useMemo } from "react";
import { Button, Flex, Modal, Space, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import MembersTable from "../components/Members/MembersTable";
import { useTeamState } from "../hooks/Team/useTeamState";
import { useTeamActions } from "../hooks/Team/useTeamActions";
import FormModalButton from "../components/UI/FormModalButton";
import NewMemberForm from "../components/Forms/NewMemberForm";
import { useTeam } from "../context/Members";

export default function TeamPage() {
  const { teamMembers, dispatch, addMember } = useTeam();
  // const { addMember } = useTeamActions(dispatch);
  const [openModal, setOpenModal] = useState(false);

  const handleInvite = (values) => {
    addMember(values);
    setOpenModal(false);
  };

  return (
    <div>
      <Flex align="center" justify="space-between">
        <h1>My Team</h1>
        <FormModalButton
          icon={<UserAddOutlined />}
          form={NewMemberForm}
          onSubmit={addMember}
        >
          InviteMember
        </FormModalButton>
      </Flex>
      <MembersTable members={teamMembers} dispatch={dispatch} />
    </div>
  );
}
