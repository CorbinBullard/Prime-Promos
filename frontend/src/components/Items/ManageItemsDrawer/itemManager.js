import React from "react";
import EditItem from "./Tabs/EditItemTab";

export const itemManagerTabs = (item) => [
  {
    key: "details",
    label: " Item Details",
    children: <EditItem item={item} />,
  },
];
