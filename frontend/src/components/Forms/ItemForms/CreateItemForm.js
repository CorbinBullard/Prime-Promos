import React from "react";
import { DatePicker, Input, Form, Space } from "antd";
import dayjs from "dayjs";
const { Item } = Form;

export default function CreateItemForm({ form, initialValues }) {
  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Item
        name="name"
        rules={[{ required: true, message: "Please Enter an Item Name" }]}
      >
        <Input addonBefore="Item Name" />
      </Item>
    </Form>
  );
}
