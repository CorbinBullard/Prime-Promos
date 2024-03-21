import { Checkbox, DatePicker, Form, Input } from "antd";
import React from "react";
import moment from "moment"; // Step 1: Import moment

const { Item } = Form;

export default function ItemOrderForm({ form, onValuesChange, initialValues }) {
  // Step 2: Convert shipDate to a moment object for the DatePicker
  const formattedInitialValues = {
    ...initialValues,
    shipDate: initialValues.shipDate ? moment(initialValues.shipDate) : null,
  };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={formattedInitialValues} // Use the formatted initialValues here
    >
      <Item name="factory">
        <Input addonBefore="Factory" style={{ width: "100%" }} />
      </Item>
      <Item name="primePO">
        <Input addonBefore="Prime PO" style={{ width: "100%" }} />
      </Item>
      <Item name="preVirtual">
        <Checkbox>Pre-Virtual</Checkbox>
      </Item>
      <Item name="shipDate" label="Ship Date">
        <DatePicker style={{ width: "100%" }} />
      </Item>
      <Item name="tracking">
        <Input addonBefore="Tracking #" style={{ width: "100%" }} />
      </Item>
    </Form>
  );
}
