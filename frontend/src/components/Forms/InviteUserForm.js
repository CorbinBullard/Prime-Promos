import { Form, Input, Select } from "antd";
import React from "react";
const { Item } = Form;
export default function NewMemberForm({ form, initialValues }) {
  return (
    <Form form={form} initialValues={initialValues} layout="vertical">
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
      <Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter a First Name" }]}
      >
        <Input placeholder="John" />
      </Item>
      <Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter a Last Name" }]}
      >
        <Input placeholder="Doe" />
      </Item>
    </Form>
  );
}
