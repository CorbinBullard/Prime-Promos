import { Form, Input, Select } from "antd";
import React from "react";
const { Item } = Form;
export default function AddMemberForm({ form }) {
  return (
    <Form form={form}>
      <Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please Enter an Email" }]}
      >
        <Input type="email" placeholder="example@email.com" />
      </Item>
      <Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select a role" }]}
      >
        <Select
          placeholder="Select a role"
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
          ]}
        />
      </Item>
    </Form>
  );
}
