import React from "react";
import { DatePicker, Input, Form, Space } from "antd";
import dayjs from "dayjs";
const { Item } = Form;

export default function CreateItemForm({ form }) {
  return (
    <Form form={form} layout="vertical">
      <Item
        name="name"
        label="Item Name"
        rules={[{ required: true, message: "Please Enter an Item Name" }]}
      >
        <Input />
      </Item>
      <Space
        size="middle"
        style={{ display: "flex",  }}
      >
        <Item
          name="inHandsDate"
          label="In Hands Date"
          rules={[
            {
              required: true,
              message: "Please Enter an In Hands Date",
            },
            () => ({
              validator(_, value) {
                if (!value || dayjs().isBefore(value, "day")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("In Hands Date must be after today")
                );
              },
            }),
          ]}
        >
          <DatePicker />
        </Item>
        <Item
          name="eventDate"
          label="Event Date"
          dependencies={["inHandsDate"]} // Declare dependency to revalidate when inHandsDate changes
          rules={[
            {
              required: true,
              message: "Please Enter an Event Date",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const inHandsDate = getFieldValue("inHandsDate");
                if (!value || dayjs(inHandsDate).isBefore(value, "day")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Event Date must be after In Hands Date")
                );
              },
            }),
            () => ({
              validator(_, value) {
                if (!value || dayjs().isBefore(value, "day")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Event Date must be after today")
                );
              },
            }),
          ]}
        >
          <DatePicker />
        </Item>
      </Space>
    </Form>
  );
}
