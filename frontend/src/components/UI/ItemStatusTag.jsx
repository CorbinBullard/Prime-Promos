import { Tag } from "antd";
import React from "react";
import { capitalize } from "../../utils/utilFunctions";
import { ItemStatusColors } from "../../utils/constants";

export default function ItemStatusTag({ item }) {
  return (
    <Tag color={ItemStatusColors[item.status]} style={{ fontStyle: "italic" }}>
      {capitalize(item.status)}
    </Tag>
  );
}
