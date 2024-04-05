import React, { useMemo } from "react";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Flex,
  InputNumber,
} from "antd";
import { useTeam } from "../../context/useTeam";
import UserDropdown from "../UI/UserDropdown";
import dayjs from "dayjs";
import { formatDateForForm } from "../../utils/utilFunctions";
import { dateFormat } from "../../utils/constants";
const { Item } = Form;

export default function CreateProjectForm({ form, initialValues }) {
  const { teamMembers } = useTeam();

  const formattedInitialValues = {
    ...initialValues,
    inHandsDate: formatDateForForm(initialValues?.inHandsDate),
    eventDate: formatDateForForm(initialValues?.eventDate),
  };
  console.log("formattedInitialValues : ", formattedInitialValues);
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
      <Flex justify="space-between" flex={1} gap={5}>
        <Item
          style={{ flex: 1 }}
          name="inHandsDate"
          rules={[
            {
              required: true,
              message: "Please Enter an In Hands Date",
            },
            () => ({
              validator(_, value) {
                if (
                  !value ||
                  dayjs().isBefore(value, "day") ||
                  !!initialValues
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("In Hands Date must be after today")
                );
              },
            }),
          ]}
        >
          <DatePicker
            format={dateFormat}
            style={{ width: "100%" }}
            placeholder="In Hands Date"
          />
        </Item>
        <Item
          style={{ flex: 1 }}
          name="eventDate"
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
                if (
                  !value ||
                  dayjs().isBefore(value, "day") ||
                  !!initialValues
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Event Date must be after today")
                );
              },
            }),
          ]}
        >
          <DatePicker
            format={dateFormat}
            style={{ width: "100%" }}
            placeholder="Event Date"
          />
        </Item>
      </Flex>
      <Item name="customerPO" label="Customer PO">
        <InputNumber
          placeholder="Enter Customer PO"
          style={{ width: "100%" }}
        />
      </Item>
      <Item name="salesConfirmation" label="Sales Confirmation">
        <InputNumber
          placeholder="Enter Sales Confirmation"
          style={{ width: "100%" }}
        />
      </Item>
    </Form>
  );
}
