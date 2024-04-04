import { Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import React from "react";
import moment from "moment";
import FileUploader from "../../UI/FileUploader";
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
    proofForAprovalDate: formatDateForForm(initialValues?.proofForAprovalDate),
    delivered: formatDateForForm(initialValues?.delivered),
    recieveOrderAcknowledge: formatDateForForm(
      initialValues?.recieveOrderAcknowledge
    ),
  };

  const handleImageUpload = (url) => {
    form.setFieldsValue({ proofForAprovalFile: url });
    onValuesChange &&
      onValuesChange(
        {
          proofForAprovalFile: url,
          proofForAprovalDate: moment(),
          recieveOrderAcknowledge: moment(),
        },
        { ...form.getFieldsValue(), proofForAprovalFile: url }
      );
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onValuesChange={onValuesChange}
      initialValues={formattedInitialValues}
    >
      <Item name="recieveOrderAcknowledge" label="Recieved Order Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
      <Item name="proofForAprovalFile" label="Proof For Aproval">
        <FileUploader
          callback={handleImageUpload}
          initialUrl={initialValues?.proofForAprovalFile}
        />
      </Item>
      <Item name="proofForAprovalDate" label="Proof For Aproval">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
      <Item name="tracking">
        <InputNumber addonBefore="Tracking #" style={{ width: "100%" }} />
      </Item>
      <Item name="invoice">
        <Input addonBefore="Invoice #" />
      </Item>
    </Form>
  );
}
