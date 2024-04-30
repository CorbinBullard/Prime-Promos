import React from "react";
import { Form, Input } from "antd";

export default function CreateNoteForm({ form, initialValues }) {
  return (
    <Form form={form} initialValues={initialValues} layout="vertical">
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please Enter a Note Title" }]}
        label="Note Title"
      >
        <Input placeholder="Enter Note Title"/>
      </Form.Item>
      <Form.Item
        name="message"
        rules={[{ required: true, message: "Please Enter Note Content" }]}
        label="Note Content"
      >
        <Input.TextArea rows={4} placeholder="Enter Note Content"/>
      </Form.Item>
    </Form>
  );
}
