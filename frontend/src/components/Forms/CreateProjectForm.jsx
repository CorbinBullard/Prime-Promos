import React, { useMemo } from "react";
import { Form, Input, Select } from "antd";
import { useTeamState } from "../../hooks/Team/useTeamState";
const { Item } = Form;

export default function CreateProjectForm({ form }) {
  const { teamMembers } = useTeamState();
  const userOptions = useMemo(() => {
    return Object.values(teamMembers).map((member) => ({
      label: `${member.firstName} ${member.lastName}`,
      value: member.id,
    }));
  }, [teamMembers]);
  return (
    <Form form={form}>
      <Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please Enter a Name" }]}
      >
        <Input />
      </Item>
      <Item name="users" label="Users">
        <Select
          defaultValue={[]}
          mode="multiple"
          placeholder="Select Users"
          options={userOptions}
        ></Select>
      </Item>
    </Form>
  );
}
