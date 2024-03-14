import React, { useMemo } from "react";
import { Form, Input, Select } from "antd";
import { useTeam } from "../../context/useTeam";
import UserDropdown from "../UI/UserDropdown";
const { Item } = Form;

export default function CreateProjectForm({ form }) {
  const { teamMembers } = useTeam();

  return (
    <Form form={form}>
      <Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please Enter a Name" }]}
      >
        <Input />
      </Item>
      {/* This is the UserDropdown component */}
      <UserDropdown options={teamMembers} />
      {/* <Item name="users" label="Users">
        <Select
          defaultValue={[]}
          mode="multiple"
          placeholder="Select Users"
          options={userOptions}
        />
      </Item> */}
    </Form>
  );
}
