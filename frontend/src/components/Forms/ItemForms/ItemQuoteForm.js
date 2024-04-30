import {
  Button,
  Form,
  Input,
  InputNumber,
  Divider,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { CalculatorOutlined } from "@ant-design/icons";
import { formItemLayout, priceCodes } from "../../../utils/constants";
import FileUploader from "../../UI/FileHandling/FileUploader";
import Compact from "antd/es/space/Compact";
import CompactItemLabel from "../../UI/CompactItemLabel";
import { validatePrices } from "../../../utils/utilFunctions";
const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;

export default function ItemQuoteForm({ form, onValuesChange, initialValues }) {
  const [isSellUnitCalcButtonDisabled, setIsSellUnitCalcButtonDisabled] =
    useState(initialValues?.netUnitPrice && initialValues?.unitPriceCode);
  const [isNetUnitCalcButtonDisabled, setIsNetUnitCalcButtonDisabled] =
    useState(initialValues?.sellUnitPrice && initialValues?.unitPriceCode);
  const [isSellSetupCalcButtonDisabled, setIsSellSetupCalcButtonDisabled] =
    useState(initialValues?.netUnitPrice && initialValues?.setupPriceCode);
  const [isNetSetupCalcButtonDisabled, setIsNetSetupCalcButtonDisabled] =
    useState(initialValues?.sellUnitPrice && initialValues?.setupPriceCode);

  const [unitPriceStatus, setUnitPriceStatus] = useState(null);
  const [setupPriceStatus, setSetupPriceStatus] = useState(null);

  const handleImageUpload = (url) => {
    form.setFieldsValue({ preVirtual: url });
    onValuesChange &&
      onValuesChange(
        { preVirtual: url },
        { ...form.getFieldsValue(), preVirtual: url }
      );
  };
  // Checks Current Values of Net Unit Price and Sell Unit Price
  // ADD WARNING: "Please enter a Net Unit Price and Price Code to calculate Sell Unit Price"
  useEffect(() => {
    setIsSellUnitCalcButtonDisabled(
      !form.getFieldValue("netUnitPrice") ||
        !form.getFieldValue("unitPriceCode")
    );
    setIsNetUnitCalcButtonDisabled(
      !form.getFieldValue("sellUnitPrice") ||
        !form.getFieldValue("unitPriceCode")
    );
    setIsSellSetupCalcButtonDisabled(
      !form.getFieldValue("netSetup") || !form.getFieldValue("setupPriceCode")
    );
    setIsNetSetupCalcButtonDisabled(
      !form.getFieldValue("sellSetup") || !form.getFieldValue("setupPriceCode")
    );
  }, [
    form.getFieldValue("netUnitPrice"),
    form.getFieldValue("sellUnitPrice"),
    form.getFieldValue("unitPriceCode"),
    form.getFieldValue("netSetup"),
    form.getFieldValue("sellSetup"),
    form.getFieldValue("setupPriceCode"),
  ]);

  useEffect(() => {
    setUnitPriceStatus(
      validatePrices({
        net: form.getFieldValue("netUnitPrice"),
        sell: form.getFieldValue("sellUnitPrice"),
        code: form.getFieldValue("unitPriceCode"),
      })
    );
    setSetupPriceStatus(
      validatePrices({
        net: form.getFieldValue("netSetup"),
        sell: form.getFieldValue("sellSetup"),
        code: form.getFieldValue("setupPriceCode"),
      })
    );
  });

  const calculateSellUnitPrice = () => {
    const currentNetUnitPrice = form.getFieldValue("netUnitPrice");
    const percent = priceCodes[form.getFieldValue("unitPriceCode")];

    if (currentNetUnitPrice) {
      const sellUnitPrice = (currentNetUnitPrice / (1 - percent / 100)).toFixed(
        2
      );
      form.setFieldsValue({ sellUnitPrice: +sellUnitPrice });
      onValuesChange(
        { sellUnitPrice },
        { ...form.getFieldsValue(), sellUnitPrice }
      );
    }
  };

  const calculateNetUnitPrice = () => {
    const currentSellUnitPrice = form.getFieldValue("sellUnitPrice");
    const percent = priceCodes[form.getFieldValue("unitPriceCode")];
    if (currentSellUnitPrice) {
      const netUnitPrice = (currentSellUnitPrice * (1 - percent / 100)).toFixed(
        2
      );
      form.setFieldsValue({ netUnitPrice: +netUnitPrice });
      onValuesChange(
        { netUnitPrice },
        { ...form.getFieldsValue(), netUnitPrice }
      );
    }
  };

  const calculateSellSetup = () => {
    const currentNetSetup = form.getFieldValue("netSetup");
    const percent = priceCodes[form.getFieldValue("setupPriceCode")];

    if (currentNetSetup) {
      const sellSetup = (currentNetSetup / (1 - percent / 100)).toFixed(2);
      form.setFieldsValue({ sellSetup: +sellSetup });
      onValuesChange({ sellSetup }, { ...form.getFieldsValue(), sellSetup });
    }
  };

  const calculateNetSetup = () => {
    const currentSellSetup = form.getFieldValue("sellSetup");
    const percent = priceCodes[form.getFieldValue("setupPriceCode")];
    if (currentSellSetup) {
      const netSetup = (currentSellSetup * (1 - percent / 100)).toFixed(2);
      form.setFieldsValue({ netSetup: +netSetup });
      onValuesChange({ netSetup }, { ...form.getFieldsValue(), netSetup });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      {...formItemLayout}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
    >
      <Item name="spcNumber" label="SPC Number">
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter SPC Number"
          controls={false}
        />
      </Item>
      <Item name="itemNumber" label="Item #">
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter Item Number"
          controls={false}
        />
      </Item>
      <Item name="quantity" label="Quantity">
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter Item Quantity"
        />
      </Item>
      <Item name="itemColor" label="Item Color">
        <Input style={{ width: "100%" }} placeholder="Enter Item Color" />
      </Item>
      <Item name="preVirtual" label="Pre Virtual (optional)">
        <FileUploader
          callback={handleImageUpload}
          initialUrl={initialValues?.preVirtual}
        />
      </Item>
      <Item name="logoColor" label="Logo Color">
        <Input style={{ width: "100%" }} placeholder="Enter Logo Color" />
      </Item>
      <Item name="stockCheck" label="Stock Check">
        <Input.TextArea placeholder="Enter Stock Check" />
      </Item>
      <Item name="decorationMethod" label="Decoration Method">
        <Input
          style={{ width: "100%" }}
          placeholder="Enter Decoration Method"
        />
      </Item>
      <Item name="numberOfImprintColors" label="Number of Imprint Colors">
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter The Number of Imprint Colors"
        />
      </Item>
      <Item name="productionTime" label="Production Time">
        <Input
          style={{ width: "100%" }}
          placeholder="Enter The Production Time"
        />
      </Item>
      <Divider>Unit Price</Divider>
      <Item name="unitPriceCode" label="Price Code">
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
      <div style={{ height: "30px" }}>
        <Typography.Text
          style={{ padding: "0 0 8px" }}
          type={unitPriceStatus === "error" ? "danger" : ""}
        >
          Sell Unit Price
        </Typography.Text>
      </div>
      <Compact style={{ width: "100%", marginBottom: "24px" }}>
        <Item
          name="sellUnitPrice"
          noStyle
          label="Sell Unit Price"
          dependencies={["netUnitPrice", "priceCode", "sellUnitPrice"]}
        >
          <InputNumber
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
            status={unitPriceStatus}
            placeholder="Enter Sell Unit Price"
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={isSellUnitCalcButtonDisabled}
          onClick={calculateSellUnitPrice}
        />
      </Compact>
      <div style={{ height: "30px" }}>
        <Typography.Text
          style={{ padding: "0 0 8px" }}
          type={unitPriceStatus === "error" ? "danger" : ""}
        >
          Net Unit Price
        </Typography.Text>
      </div>
      <Compact style={{ width: "100%", marginBottom: "24px" }}>
        <Item
          name="netUnitPrice"
          style={{ width: "100%" }}
          noStyle
          dependencies={["sellUnitPrice", "priceCode", "netUnitPrice"]}
        >
          <InputNumber
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
            status={unitPriceStatus}
            placeholder="Enter Net Unit Price"
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={isNetUnitCalcButtonDisabled}
          onClick={calculateNetUnitPrice}
        />
      </Compact>
      {unitPriceStatus === "error" && (
        <Text type="danger" style={{ margin: 0 }}>
          Net Unit Price and Sell Unit Price Do not Align with Price Code
        </Text>
      )}
      <Divider>Setup Price</Divider>
      <Item name="setupPriceCode" label="Price Code">
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
      <CompactItemLabel status={setupPriceStatus}>Sell Setup</CompactItemLabel>
      <Compact style={{ width: "100%", marginBottom: "24px" }}>
        <Item name="sellSetup" noStyle>
          <InputNumber
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
            placeholder="Enter Sell Setup"
            status={setupPriceStatus}
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={isNetUnitCalcButtonDisabled}
          onClick={calculateSellSetup}
        />
      </Compact>
      <CompactItemLabel status={setupPriceStatus}>Net Setup</CompactItemLabel>
      <Compact style={{ width: "100%", marginBottom: "24px" }}>
        <Item name="netSetup" noStyle>
          <InputNumber
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
            placeholder="Enter Net Setup"
            status={setupPriceStatus}
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={isNetUnitCalcButtonDisabled}
          onClick={calculateNetSetup}
        />
      </Compact>
      {setupPriceStatus === "error" && (
        <Text type="danger" style={{ margin: 0 }}>
          Net Setup Price and Sell Setup Price Do not Align with Price Code
        </Text>
      )}
      <Divider>Additional Charges</Divider>
      <Item name="proofCharge" label="Proof Charge">
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
          placeholder="Enter Proof Charge"
        />
      </Item>
      <Item name="pmsCharge" label="PMS Charge">
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
          placeholder="Enter PMS Charge"
        />
      </Item>

      <Item name="shippingEstimate" label="Shipping Estimate">
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          placeholder="Enter Shipping Estimate"
          controls={false}
        />
      </Item>
    </Form>
  );
}
