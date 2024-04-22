import { Select } from "antd";
import React from "react";
import { priceCodes } from "../../utils/constants";
const { Option } = Select;

export default function PriceCodeSelector({ cb }) {
  const handleChange = (value) => {
    if (cb) cb(value);
  };
  return (
    <Select
      placeholder="Code"
      onChange={handleChange}
      style={{
        // width: "5rem",
      }}
    >
      {Object.entries(priceCodes).map(([key, value]) => (
        <Option key={key} value={key}>
          {key}
        </Option>
      ))}
    </Select>
  );
}
