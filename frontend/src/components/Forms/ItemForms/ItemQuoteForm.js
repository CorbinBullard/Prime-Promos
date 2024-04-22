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
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { CalculatorOutlined } from "@ant-design/icons";
import { formItemLayout, priceCodes } from "../../../utils/constants";
import FileUploader from "../../UI/FileHandling/FileUploader";
const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;

export default function ItemQuoteForm({ form, onValuesChange, initialValues }) {
  const [isSellUnitCalcButtonDisabled, setIsSellUnitCalcButtonDisabled] =
    useState(initialValues?.netUnitPrice && initialValues?.priceCode);
  const [isNetUnitCalcButtonDisabled, setIsNetUnitCalcButtonDisabled] =
    useState(initialValues?.sellUnitPrice && initialValues?.priceCode);

  const [unitPriceStatus, setUnitPriceStatus] = useState(null);

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
      !form.getFieldValue("netUnitPrice") || !form.getFieldValue("priceCode")
    );
    setIsNetUnitCalcButtonDisabled(
      !form.getFieldValue("sellUnitPrice") || !form.getFieldValue("priceCode")
    );
  }, [form.getFieldValue("netUnitPrice"), form.getFieldValue("sellUnitPrice")]);

  useEffect(() => {
    validateUnitPrices();
  });
  const validateUnitPrices = async () => {
    const netUnitPrice = form.getFieldValue("netUnitPrice");
    const sellUnitPrice = form.getFieldValue("sellUnitPrice");
    const percent = priceCodes[form.getFieldValue("priceCode")];

    if (!netUnitPrice || !percent || !sellUnitPrice) {
      return;
    }

    const calculatedSellUnitPrice = netUnitPrice / (1 - percent / 100);
    if (calculatedSellUnitPrice !== sellUnitPrice) {
      setUnitPriceStatus("error");
    } else setUnitPriceStatus("success");
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
      {unitPriceStatus === "error" && (
        <Text type="danger">
          Net Unit Price and Sell Unit Price Do not Align with Price Code
        </Text>
      )}
      <Flex justify="space-between" gap={10}>
        <Item
          name="sellUnitPrice"
          style={{ width: "100%" }}
          dependencies={["netUnitPrice", "priceCode", "sellUnitPrice"]}
        >
          <InputNumber
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
            addonBefore="Sell Unit Price"
            status={unitPriceStatus}
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={isSellUnitCalcButtonDisabled}
          onClick={calculateSellUnitPrice}
        />
      </Flex>
      <Flex justify="space-between" gap={10}>
        <Item
          name="netUnitPrice"
          style={{ width: "100%" }}
          dependencies={["sellUnitPrice", "priceCode", "netUnitPrice"]}
        >
          <InputNumber
            addonBefore="Net Unit Price"
            style={{ width: "100%" }}
            prefix="$"
            precision={2}
            controls={false}
            status={unitPriceStatus}
          />
        </Item>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          disabled={isNetUnitCalcButtonDisabled}
          onClick={calculateNetUnitPrice}
        />
      </Flex>
      <Divider>Additional Charges</Divider>
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
