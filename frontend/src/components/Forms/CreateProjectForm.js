import React, { useMemo } from "react";
import { DatePicker, Form, Input, Select, Space } from "antd";
import { useTeam } from "../../context/useTeam";
import UserDropdown from "../UI/UserDropdown";
import dayjs from "dayjs";
import moment from "moment";
const { Item } = Form;

export default function CreateProjectForm({ form, initialValues }) {
  const { teamMembers } = useTeam();

  const formattedInitialValues = {
    ...initialValues,
    inHandsDate: initialValues?.inHandsDate
      ? moment(initialValues.shipDate)
      : null,
    eventDate: initialValues?.inHandsDate
      ? moment(initialValues.shipDate)
      : null,
  };
  return (
    <Form form={form} initialValues={formattedInitialValues}>
      <Item
        name="name"
        rules={[{ required: true, message: "Please Enter a Name" }]}
      >
        <Input placeholder="Enter Project Name" />
      </Item>
      {/* Add with users only When Creating a project, not when editting! */}
      {!initialValues && <UserDropdown options={teamMembers} />}
      <Space size="middle" style={{ display: "flex" }}>
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
      <Item name="customerPO" label="Customer PO">
        <Input placeholder="Enter Customer PO" />
      </Item>
      <Item name="salesConfirmation" label="Sales Confirmation">
        <Input placeholder="Enter Sales Confirmation" />
      </Item>
    </Form>
  );
}
