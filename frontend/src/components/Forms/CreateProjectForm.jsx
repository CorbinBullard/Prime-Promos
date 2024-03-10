import React from "react";
import { Form, Input, Select } from "antd";
const { Item } = Form;

export default function CreateProjectForm({ form }) {
  return (
    <Form form={form}>
      <Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please Enter a Name" }]}
      >
        <Input />
      </Item>
      <Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please Enter a Description" }]}
      >
        <Input />
      </Item>
    </Form>
  );
}
