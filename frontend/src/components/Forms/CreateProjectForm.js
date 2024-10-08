import React, { useMemo } from "react";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Flex,
  InputNumber,
  Divider,
  Button,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTeam } from "../../context/useTeam";
import UserDropdown from "../UI/UserDropdown";
import dayjs from "dayjs";
import { formatDateForForm } from "../../utils/utilFunctions";
import { dateFormat } from "../../utils/constants";
import CompactItemLabel from "../UI/CompactItemLabel";
const { Compact } = Space;
const { Item } = Form;

export default function CreateProjectForm({ form, initialValues }) {
  const { teamMembers } = useTeam();

  const formattedInitialValues = {
    ...initialValues,
    inHandsDate: formatDateForForm(initialValues?.inHandsDate),
    eventDate: formatDateForForm(initialValues?.eventDate),
  };
  return (
    <Form form={form} initialValues={formattedInitialValues} layout="vertical">
      <Item
        name="name"
        label="Project Name"
        rules={[{ required: true, message: "Please Enter a Name" }]}
      >
        <Input placeholder="Enter Project Name" />
      </Item>
      <Flex justify="space-between" flex={1} gap={5}>
        <Item
          name="organizationName"
          label="Organization Name"
          style={{ flex: 1 }}
        >
          <Input placeholder="Enter Organization Name" />
        </Item>
        <Item name="contactName" label="Contact Name" style={{ flex: 1 }}>
          <Input placeholder="Enter Contact Name" />
        </Item>
      </Flex>
      <Flex justify="space-between" flex={1} gap={5}>
        <Item name="contactEmail" label="Contact Email" style={{ flex: 1 }}>
          <Input type="email" placeholder="user@example.com" />
        </Item>
        <Item label="Contact Phone" name="contactPhone" style={{ flex: 1 }}>
          <InputNumber
            addonBefore="+1"
            style={{ width: "100%" }}
            placeholder="Enter Phone Number"
            controls={false}
          />
        </Item>
      </Flex>
      {/* Add with users only When Creating a project, not when editting! */}

      <Flex justify="space-between" flex={1} gap={5}>
        <Item
          label="In Hands Date"
          style={{ flex: 1 }}
          name="inHandsDate"
          rules={[
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
          label="Event Date"
          style={{ flex: 1 }}
          name="eventDate"
          dependencies={["inHandsDate"]} // Declare dependency to revalidate when inHandsDate changes
          rules={[
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
      {!initialValues && (
        <>
          <Divider>Add Team Members</Divider>
          <UserDropdown options={teamMembers} />
        </>
      )}
      {initialValues && (
        <>
          <Flex justify="space-between" flex={1} gap={5}>
            <Item name="customerPO" label="Customer PO" style={{ flex: "1" }}>
              <InputNumber
                placeholder="Enter Customer PO"
                style={{ width: "100%" }}
                controls={false}
              />
            </Item>
            <Item
              name="salesConfirmation"
              label="Sales Confirmation"
              style={{ flex: "1" }}
            >
              <InputNumber
                placeholder="Enter Sales Confirmation"
                style={{ width: "100%" }}
                controls={false}
              />
            </Item>
          </Flex>
          <Flex justify="space-between" flex={1} gap={5}>
            <Flex gap={5} flex={1} vertical>
              <CompactItemLabel>Ship To</CompactItemLabel>
              <Item name="shipToName" noStyle>
                <Input placeholder="Enter Organization Name" />
              </Item>
              <Item name="shipToAddress" noStyle>
                <Input placeholder="Enter Address" />
              </Item>
              <Compact>
                <Item name="shipToCity" noStyle>
                  <Input placeholder="City" style={{ width: "40%" }} />
                </Item>
                <Item name="shipToState" noStyle>
                  <Input placeholder="State" style={{ width: "20%" }} />
                </Item>
                <Item name="shipToZip" noStyle>
                  <InputNumber
                    placeholder="Zip"
                    style={{ width: "40%" }}
                    controls={false}
                  />
                </Item>
              </Compact>
            </Flex>
            <Flex gap={5} flex={1} vertical>
              <CompactItemLabel>Bill To</CompactItemLabel>
              <Item name="billToName" noStyle>
                <Input placeholder="Enter Organization Name" />
              </Item>
              <Item name="billToAddress" noStyle>
                <Input placeholder="Enter Address" />
              </Item>
              <Compact>
                <Item name="billToCity" noStyle>
                  <Input placeholder="City" style={{ width: "40%" }} />
                </Item>
                <Item name="billToState" noStyle>
                  <Input placeholder="State" style={{ width: "20%" }} />
                </Item>
                <Item name="billToZip" noStyle>
                  <InputNumber
                    placeholder="Zip"
                    style={{ width: "40%" }}
                    controls={false}
                  />
                </Item>
              </Compact>
            </Flex>
          </Flex>
        </>
      )}
      {!initialValues && (
        <>
          <Divider>Add Items</Divider>
          <Form.List name="items">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, i) => (
                  <Form.Item
                    {...field}
                    key={field.key}
                    rules={[{ required: true, message: "Missing Item Name" }]}
                  >
                    <Flex gap={10}>
                      <Input
                        placeholder="Item Name"
                        style={{ width: "100%" }}
                      />
                      <MinusCircleOutlined
                        style={{ fontSize: "20px", color: "red" }}
                        onClick={() => remove(field.name)}
                      />
                    </Flex>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{
                      width: "100%",
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      )}
    </Form>
  );
}
