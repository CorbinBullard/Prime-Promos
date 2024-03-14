import { List } from "antd";
import React from "react";
import { useTeam } from "../../../../context/useTeam";

export default function ManageUsersTab({ project }) {
  const { teamMembers } = useTeam();

  const renderItem = (user) => {
    return <List.Item>
      <List.Item.Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
    </List.Item>;
  }

  return <List dataSource={teamMembers} renderItem={renderItem} />;
}
