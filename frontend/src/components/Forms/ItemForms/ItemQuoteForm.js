import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  Space,
  Divider,
  Select,
  Flex,
} from "antd";
import React from "react";
import { UploadOutlined, CalculatorOutlined } from "@ant-design/icons";
import ImageUploader from "../../UI/FileHandling/ImageUploader";
import { formItemLayout, priceCodes } from "../../../utils/constants";
import FileUploader from "../../UI/FileHandling/FileUploader";
const { Item } = Form;
const { Option } = Select;
const { Compact } = Space;

export default function ItemQuoteForm({ form, onValuesChange, initialValues }) {
  const handleImageUpload = (url) => {
    form.setFieldsValue({ preVirtual: url });
    onValuesChange &&
      onValuesChange(
        { preVirtual: url },
        { ...form.getFieldsValue(), preVirtual: url }
      );
  };

  const calculateSellUnitPrice = () => {
    const currentNetUnitPrice = form.getFieldValue("netUnitPrice");
    const percent = priceCodes[form.getFieldValue("priceCode")];

    if (currentNetUnitPrice) {
      const sellUnitPrice = currentNetUnitPrice / (1 - percent / 100);
      form.setFieldsValue({ sellUnitPrice });

      onValuesChange(
        { sellUnitPrice },
        { ...form.getFieldsValue(), sellUnitPrice }
      );
    }
  };
  const calculateNetUnitPrice = () => {
    const currentSellUnitPrice = form.getFieldValue("sellUnitPrice");
    const percent = priceCodes[form.getFieldValue("priceCode")];
    if (currentSellUnitPrice) {
      const netUnitPrice = currentSellUnitPrice * (1 - percent / 100);
      form.setFieldsValue({ netUnitPrice });

      onValuesChange(
        { netUnitPrice },
        { ...form.getFieldsValue(), netUnitPrice }
      );
    }
  };

  return (
    <Form
      form={form}
      {...formItemLayout}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
    >
      <Item name="spcNumber">
        <InputNumber addonBefore="SPC Number" style={{ width: "100%" }} />
      </Item>
      <Item name="itemNumber">
        <InputNumber addonBefore="Item #" style={{ width: "100%" }} />
      </Item>
      <Item name="quantity">
        <InputNumber addonBefore="Quantity" style={{ width: "100%" }} />
      </Item>
      <Item name="itemColor">
        <Input addonBefore="Item Color" style={{ width: "100%" }} />
      </Item>
      <Item name="preVirtual" label="Pre Virtual (optional)">
        <FileUploader
          callback={handleImageUpload}
          initialUrl={initialValues?.preVirtual}
        />
      </Item>
      <Item name="logoColor">
        <Input addonBefore="Logo Color" style={{ width: "100%" }} />
      </Item>
      <Item name="stockCheck" label="Stock Check" tooltip="CHECK">
        <Input.TextArea placeholder="Stock Check" />
      </Item>
      <Divider>Unit Price</Divider>
      <Item name="priceCode" label="Price Code">
        <Select
          placeholder="Code"
          style={{
            width: "5rem",
          }}
        >
          {Object.entries(priceCodes).map(([key, value]) => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
        </Select>
      </Item>
      <Flex justify="space-between" gap={10}>
        <Item name="sellUnitPrice" style={{ width: "100%" }}>
          <InputNumber
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
            addonBefore="Sell Unit Price"
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={
            !(
              form.getFieldValue("netUnitPrice") &&
              form.getFieldValue("priceCode")
            )
          }
          onClick={calculateSellUnitPrice}
          tooltip="Calculate Sell Unit Price"
        />
      </Flex>
      <Flex justify="space-between" gap={10}>
        <Item name="netUnitPrice" style={{ width: "100%" }}>
          <InputNumber
            addonBefore="Net Unit Price"
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={
            !(
              form.getFieldValue("sellUnitPrice") &&
              form.getFieldValue("priceCode")
            )
          }
          onClick={calculateNetUnitPrice}
          tooltip="Calculate Net Unit Price"
        />
      </Flex>
      <Item name="sellSetup">
        <InputNumber
          addonBefore="Sell Setup"
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
      </Item>
      <Item name="netSetup">
        <InputNumber
          addonBefore="Net Setup"
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
      </Item>
      <Item name="proofCharge">
        <InputNumber
          addonBefore="Proof Charge"
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
      </Item>
      <Item name="pmsCharge">
        <InputNumber
          addonBefore="PMS Charge"
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
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
          prefix="$"
          precision={2}
        />
      </Item>
    </Form>
  );
}
