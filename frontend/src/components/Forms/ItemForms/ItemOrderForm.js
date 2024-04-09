import { Checkbox, DatePicker, Form, Input } from "antd";
import React from "react";
import moment from "moment";
import { formatDateForForm } from "../../../utils/utilFunctions";
import { dateFormat, formItemLayout } from "../../../utils/constants";

const { Item } = Form;

export default function ItemOrderForm({ form, onValuesChange, initialValues }) {
  // Ensure shipDate is a moment object and preVirtual is a boolean

  const formattedInitialValues = {
    ...initialValues,
    shipDate: formatDateForForm(initialValues.shipDate),
    preVirtual: !!initialValues.preVirtual, // Converts truthy/falsy values to boolean
  };
  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={formattedInitialValues}
      {...formItemLayout}
    >
      <Item name="factory">
        <Input addonBefore="Factory" style={{ width: "100%" }} />
      </Item>
      <Item name="primePO">
        <Input addonBefore="Prime PO" style={{ width: "100%" }} />
      </Item>
      <Item name="preVirtual" valuePropName="checked">
        <Checkbox>Pre-Virtual</Checkbox>
      </Item>
      <Item name="shipDate" label="Ship Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
    </Form>
  );
}
