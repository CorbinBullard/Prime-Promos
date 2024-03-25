import { Card, List } from "antd";
import React from "react";

export default function VerticalBlock({ data, header, renderItem }) {
  return (
    <Card bordered={false} style={{ minWidth: "315px" }} title={header}>
      <div style={{maxHeight: "18rem", overflow: "auto"}}>
        <List dataSource={data} renderItem={renderItem} />
      </div>
    </Card>
  );
}
