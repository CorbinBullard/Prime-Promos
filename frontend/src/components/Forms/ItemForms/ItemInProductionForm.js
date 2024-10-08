import { Checkbox, DatePicker, Flex, Form, Input, InputNumber } from "antd";
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
    receivedOrder: formatDateForForm(initialValues?.receivedOrder),
  };

  const handleImageUpload = (url) => {
    form.setFieldsValue({
      proofApprovalFileUrl: url,
    });
    if (form.getFieldValue("proofApprovalFileUrl")) {
      form.setFieldsValue({
        proofApprovalDate: moment(),
      });
    } else {
      form.setFieldsValue({
        proofApprovalDate: null,
      });
    }
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
      layout="vertical"
      onValuesChange={onValuesChange}
      initialValues={formattedInitialValues}
    >
      <Item name="receivedOrder" label="Received Order Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
      <Flex gap={10} flex={1}>
        <Item name="proofApprovalFileUrl" label="Proof Approval">
          <FileUploader
            callback={handleImageUpload}
            initialUrl={initialValues?.proofApprovalFileUrl}
          />
        </Item>
        <Item name="proofApprovalDate" label="Date" style={{ flex: 1 }}>
          <DatePicker style={{ width: "100%" }} format={dateFormat} />
        </Item>
      </Flex>
      <Item name="tracking" label="Tracking #">
        <Input style={{ width: "100%" }} placeholder="Enter Tracking Number" />
      </Item>
      <Item name="invoice" label="Invoice #">
        <Input placeholder="Enter Invoice Number" />
      </Item>
    </Form>
  );
}
