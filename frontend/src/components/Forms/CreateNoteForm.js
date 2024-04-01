import React from "react";
import { Form, Input } from "antd";

export default function CreateNoteForm({ form, initialValues }) {
  return <Form form={form} initialValues={initialValues}>
    <Form.Item name="title" rules={[{ required: true, message: "Please Enter a Note Title" }]}>
      <Input addonBefore="Note Title" />
    </Form.Item>
    <Form.Item name="message" rules={[{ required: true, message: "Please Enter Note Content" }]}>
      <Input.TextArea rows={4} />
    </Form.Item>
  </Form>;
}
