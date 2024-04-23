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
import Compact from "antd/es/space/Compact";
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
      layout="vertical"
      {...formItemLayout}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
    >
      <Item name="spcNumber" label="SPC Number">
        <InputNumber style={{ width: "100%" }} />
      </Item>
      <Item name="itemNumber" label="Item #">
        <InputNumber style={{ width: "100%" }} />
      </Item>
      <Item name="quantity" label="Quantity">
        <InputNumber style={{ width: "100%" }} />
      </Item>
      <Item name="itemColor" label="Item Color">
        <Input style={{ width: "100%" }} />
      </Item>
      <Item name="preVirtual" label="Pre Virtual (optional)">
        <FileUploader
          callback={handleImageUpload}
          initialUrl={initialValues?.preVirtual}
        />
      </Item>
      <Item name="logoColor" label="Logo Color">
        <Input style={{ width: "100%" }} />
      </Item>
      <Item name="stockCheck" label="Stock Check">
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
          // style={{ width: "100%" }}
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
      <Divider>Additional Charges</Divider>
      <Item name="sellSetup" label="Sell Setup">
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
      </Item>
      <Item name="netSetup" label="Net Setup">
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
      </Item>
      <Item name="proofCharge" label="Proof Charge">
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
      </Item>
      <Item name="pmsCharge" label="PMS Charge">
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          precision={2}
          controls={false}
        />
      </Item>
      <Item name="decorationMethod" label="Decoration Method">
        <Input style={{ width: "100%" }} />
      </Item>
      <Item name="numberOfImprintColors" label="Number of Imprint Colors">
        <InputNumber style={{ width: "100%" }} />
      </Item>
      <Item name="productionTime" label="Production Time">
        <Input style={{ width: "100%" }} />
      </Item>
      <Item name="shippingEstimate" label="Shipping Estimate">
        <InputNumber style={{ width: "100%" }} prefix="$" precision={2} />
      </Item>
    </Form>
  );
}
