import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <LoadingOutlined style={{ fontSize: "3rem" }} />
    </div>
  );
}
