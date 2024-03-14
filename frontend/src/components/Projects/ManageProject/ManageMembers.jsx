import { Flex, List } from "antd";
import React from "react";
import UserIcon from "../../Members/UserIcon";
import OptionsButton from "../../UI/OptionsButton";
import { CloseOutlined } from "@ant-design/icons";
import UserDropdown from "../../UI/UserDropdown";
import { useTeam } from "../../../context/Members";
import { Form } from "antd";
import { useProjectActions } from "../../../hooks/Projects/useProjectActions";

export default function ManageMembers({ project, dispatch }) {
  const { teamMembers } = useTeam();
  const { addUsersToProject, removeUserFromProject } =
    useProjectActions(dispatch);
  const { Users: users } = project;

  // Convert teamMembers object to an array for filtering
  const teamMembersArray = Object.values(teamMembers);

  // Filter out users not in the project
  const notInProject = teamMembersArray.filter(
    (teamMember) => !users.some((user) => user.id === teamMember.id)
  );

  // Convert notInProject back to an object if required
  const notInProjectObj = notInProject.reduce((acc, user) => {
    acc[user.id] = user; // Assuming 'id' is the unique identifier
    return acc;
  }, {});

  // Prepare options for UserDropdown if it requires an object
  // Assuming UserDropdown needs an object with user IDs as keys
  const userDropdownOptions = notInProject.reduce((options, user) => {
    options[user.id] = user;
    return options;
  }, {});

  const handleRemoveUser = (userId) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      // Call remove user function
      removeUserFromProject(project.id, userId);
    }
    // Call remove user function
  };

  const renderItem = (user) => (
    <List.Item
      style={{ display: "flex", gap: "1rem" }}
      actions={[<CloseOutlined onClick={() => handleRemoveUser(user.id)} />]} // Populate as needed
    >
      <UserIcon user={user} />
      <List.Item.Meta
        title={`${user.firstName} ${user.lastName}`}
        description={user.email}
      />
    </List.Item>
  );

  return (
    <Flex vertical gap={5}>
      <div style={{ width: "100%" }}>
        <h3>Current Project Members</h3>
        <List dataSource={users} renderItem={renderItem} bordered />
      </div>
      <div>
        <h3>Add Project Members</h3>
        {/* Pass filtered user options (as an object) to the dropdown */}
        <Form>
          <UserDropdown options={userDropdownOptions} />
        </Form>
      </div>
    </Flex>
  );
}
