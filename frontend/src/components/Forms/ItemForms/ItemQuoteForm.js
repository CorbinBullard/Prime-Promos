import { Button, Form, Input, InputNumber, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import ImageUploader from "../../UI/ImageUploader";
const { Item } = Form;

export default function ItemQuoteForm({ form, onValuesChange, initialValues }) {
  const formItemLayout = {
    style: { width: "100%", marginBottom: "2px" }, // Apply width to the layout
  };

  const handleImageUpload = (url) => {
    form.setFieldsValue({ logo: url });
    onValuesChange({ logo: url }, { ...form.getFieldsValue(), logo: url });
  };
  return (
    <Form
      form={form}
      {...formItemLayout}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
    >
      <Item name="itemNumber">
        <InputNumber addonBefore="Item #" style={{ width: "100%" }} />
      </Item>
      <Item name="quantity">
        <InputNumber addonBefore="Quantity" style={{ width: "100%" }} />
      </Item>
      <Item name="sellUnitPrice">
        <InputNumber addonBefore="Sell Unit Price" style={{ width: "100%" }} />
      </Item>
      <Item name="itemColor">
        <Input addonBefore="Item Color" style={{ width: "100%" }} />
      </Item>
      <Item name="logo">
        <ImageUploader
          callback={handleImageUpload}
          initialUrl={initialValues.logo}
        />
      </Item>
      <Item name="logoColor">
        <Input addonBefore="Logo Color" style={{ width: "100%" }} />
      </Item>
      <Item name="stockCheck">
        <Input addonBefore="Stock Check" style={{ width: "100%" }} />
      </Item>
      <Item name="netUnitPrice">
        <InputNumber addonBefore="Net Unit Price" style={{ width: "100%" }} />
      </Item>
      <Item name="netSetup">
        <InputNumber addonBefore="Net Setup" style={{ width: "100%" }} />
      </Item>
      <Item name="proofCharge">
        <InputNumber addonBefore="Proof Charge" style={{ width: "100%" }} />
      </Item>
      <Item name="pmsCharge">
        <InputNumber addonBefore="PMS Charge" style={{ width: "100%" }} />
      </Item>
      <Item name="decorationMethod">
        <Input addonBefore="Decoration Method" style={{ width: "100%" }} />
      </Item>
      <Item name="numberOfImprintColors">
        <InputNumber
          addonBefore="Number of Imprint Colors"
          style={{ width: "100%" }}
        />
      </Item>
      <Item name="productionTime">
        <Input addonBefore="Production Time" style={{ width: "100%" }} />
      </Item>
      <Item name="shippingEstimate">
        <InputNumber
          addonBefore="Shipping Estimate"
          style={{ width: "100%" }}
        />
      </Item>
    </Form>
  );
}
