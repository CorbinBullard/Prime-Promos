import { Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import React from "react";
import moment from "moment";
import FileUploader from "../../UI/FileHandling/FileUploader";
import { formatDateForForm } from "../../../utils/utilFunctions";
import { dateFormat, formItemLayout } from "../../../utils/constants";

const { Item } = Form;

export default function ItemInProductionForm({
  form,
  onValuesChange,
  initialValues,
}) {
  // Ensure shipDate is a moment object and preVirtual is a boolean
  const formattedInitialValues = {
    ...initialValues,
    proofApprovalDate: formatDateForForm(initialValues?.proofApprovalDate),
    delivered: formatDateForForm(initialValues?.delivered),
    receivedOrder: formatDateForForm(initialValues?.receivedOrder),
  };

  const handleImageUpload = (url) => {
    form.setFieldsValue({ proofApprovalFileUrl: url });
    onValuesChange &&
      onValuesChange(
        {
          proofApprovalFileUrl: url,
          proofApprovalDate: moment(),
          receivedOrder: moment(),
        },
        { ...form.getFieldsValue(), proofApprovalFileUrl: url }
      );
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onValuesChange={onValuesChange}
      initialValues={formattedInitialValues}
    >
      <Item name="receivedOrder" label="Received Order Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
      <Item name="proofApprovalFileUrl" label="Proof Aproval File">
        <FileUploader
          callback={handleImageUpload}
          initialUrl={initialValues?.proofApprovalFileUrl}
        />
      </Item>
      <Item name="proofApprovalDate" label="Proof Aproval Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
      <Item name="tracking">
        <Input addonBefore="Tracking #" style={{ width: "100%" }} />
      </Item>
      <Item name="invoice">
        <Input addonBefore="Invoice #" />
      </Item>
    </Form>
  );
}
