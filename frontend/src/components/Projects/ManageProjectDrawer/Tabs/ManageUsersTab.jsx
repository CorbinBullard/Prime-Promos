import { Button, Divider, Flex, List, Modal } from "antd";
import React, { useMemo } from "react";
import { useTeam } from "../../../../context/useTeam";
import UserIcon from "../../../Members/UserIcon";
import { CloseOutlined } from "@ant-design/icons";
import { useProjects } from "../../../../hooks/useProjects";
import UserDropdown from "../../../UI/UserDropdown";
import { Form } from "antd";

export default function ManageUsersTab({ project }) {
  const { teamMembers } = useTeam();
  const { addUsersToProject, removeUserFromProject, projects } = useProjects();
  const [form] = Form.useForm();
  const { Users: users } = project;

  const handleRemoveUser = (userId) => {
    // Remove user from project
    Modal.confirm({
      title: "Remove User",
      content: "Are you sure you want to remove this user from the project?",
      onOk: () => removeUserFromProject({ userId, projectId: project.id }),
    });
  };
  const handleAddUsers = () => {
    form.validateFields().then((values) => {
      const { users } = values;
      addUsersToProject({ projectId: project.id, users });
      form.resetFields();
    });
  };
  // optimize this
  const nonProjectUsers = useMemo(() => {
    if (!teamMembers || !users) return {};
    const obj = {};
    teamMembers.forEach((user) => {
      if (!users.find((u) => u.id === user.id)) {
        obj[user.id] = user;
      }
    });
    return obj;
  }, [teamMembers, users]);

  const renderItem = (user) => {
    return (
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
  };

  return (
    <Flex vertical gap={10}>
      <Divider>Project Users</Divider>
      <List dataSource={users} renderItem={renderItem} bordered />
      <Divider>Add Users</Divider>
      <Form onFinish={handleAddUsers} form={form}>
        <UserDropdown options={nonProjectUsers || {}} />
        <Button type="primary" htmlType="submit" block>
          Add Users
        </Button>
      </Form>
    </Flex>
  );
}
