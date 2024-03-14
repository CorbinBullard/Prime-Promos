import React, { useState, useMemo } from "react";
import { Button, Flex, Modal, Space, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import MembersTable from "../components/Members/MembersTable";

import FormModalButton from "../components/UI/FormModalButton";
import NewMemberForm from "../components/Forms/NewMemberForm";
import { useTeam } from "../context/useTeam";

export default function TeamPage() {
  const { teamMembers, addMember, isLoading, errors } = useTeam();

  return (
    <div>
      <Flex align="center" justify="space-between">
        <h1>My Team</h1>
        <FormModalButton
          icon={<UserAddOutlined />}
          form={NewMemberForm}
          onSubmit={addMember}
          title="Invite Member"
        >
          InviteMember
        </FormModalButton>
      </Flex>
      <MembersTable members={teamMembers} />
    </div>
  );
}
