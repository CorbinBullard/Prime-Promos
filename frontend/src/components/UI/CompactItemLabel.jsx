import React from "react";
import { Typography } from "antd";

export default function CompactItemLabel({ status, children }) {
  return (
    <div style={{ height: "30px" }}>
      <Typography.Text
        style={{ padding: "0 0 8px" }}
        type={status === "error" ? "danger" : ""}
      >
        {children}
      </Typography.Text>
    </div>
  );
}
