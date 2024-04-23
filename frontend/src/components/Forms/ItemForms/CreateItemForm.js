import React from "react";
import { DatePicker, Input, Form, Space } from "antd";
import dayjs from "dayjs";
const { Item } = Form;

export default function CreateItemForm({
  form,
  initialValues,
  onValuesChange,
}) {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <Item
        name="name"
        label="Item Name"
        rules={[{ required: true, message: "Please Enter an Item Name" }]}
      >
        <Input />
      </Item>
    </Form>
  );
}
