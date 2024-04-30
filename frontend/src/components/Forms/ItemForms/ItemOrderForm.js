import { Checkbox, DatePicker, Form, Input } from "antd";
import React from "react";
import moment from "moment";
import { formatDateForForm } from "../../../utils/utilFunctions";
import { dateFormat, formItemLayout } from "../../../utils/constants";
import FileUploader from "../../UI/FileHandling/FileUploader";
import ImageUploader from "../../UI/FileHandling/ImageUploader";

const { Item } = Form;

export default function ItemOrderForm({ form, onValuesChange, initialValues }) {
  // Ensure shipDate is a moment object and preVirtual is a boolean

  const formattedInitialValues = {
    ...initialValues,
    shipDate: formatDateForForm(initialValues.shipDate),
    logo: !!initialValues.logo, // Converts truthy/falsy values to boolean
  };

  const handleImageUpload = (url) => {
    form.setFieldsValue({ logo: url });
    onValuesChange &&
      onValuesChange(
        {
          logo: url,
        },
        { ...form.getFieldsValue(), logo: url }
      );
  };
  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={formattedInitialValues}
      {...formItemLayout}
      layout="vertical"
    >
      <Item name="factory" label="Factory">
        <Input style={{ width: "100%" }} placeholder="Enter Factory Name" />
      </Item>
      <Item name="primePO" label="Prime PO">
        <Input style={{ width: "100%" }} placeholder="Enter Prime PO" />
      </Item>
      <Item name="logo" label="Item Logo">
        <FileUploader
          buttonText={"Upload Logo"}
          callback={handleImageUpload}
          initialUrl={initialValues.logo}
        />
      </Item>
      <Item name="shipDate" label="Ship Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
    </Form>
  );
}
