import { DatePicker, Form, Input } from "antd";
import React from "react";
import { dateFormat, formItemLayout } from "../../../utils/constants";
import { formatDateForForm } from "../../../utils/utilFunctions";

const { Item } = Form;
export default function ItemShippedForm({
  form,
  onValuesChange,
  initialValues,
}) {
  const formattedInitialValues = {
    ...initialValues,
    delivered: formatDateForForm(initialValues?.delivered),
  };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
      {...formItemLayout}
    >
      <Item name="delivered" label="Delivery Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
    </Form>
  );
}
