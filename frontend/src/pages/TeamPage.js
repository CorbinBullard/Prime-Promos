import React, { useState } from "react";
import { Flex } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import MembersTable from "../components/Members/MembersTable";

import FormModalButton from "../components/UI/FormModalButton";
import NewMemberForm from "../components/Forms/InviteUserForm";
import { useTeam } from "../context/useTeam";
import ManagerDrawer from "../components/UI/DrawerManager";
import { userManagerTabs } from "../components/Members/ManageUserDrawer/UserManager";

export default function TeamPage() {
  const { teamMembers, addMember, isLoading, errors } = useTeam();
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <Flex vertical gap={15}>
      <Flex align="center" justify="end">
        <FormModalButton
          icon={<UserAddOutlined />}
          form={NewMemberForm}
          onSubmit={addMember}
          title="Invite Member"
        >
          InviteMember
        </FormModalButton>
      </Flex>
      <MembersTable members={teamMembers} selectMember={setSelectedMember} />
      <ManagerDrawer
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        item={selectedMember}
        tabItems={userManagerTabs(selectedMember)}
      />
    </Flex>
  );
}
