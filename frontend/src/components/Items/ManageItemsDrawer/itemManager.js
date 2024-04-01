import React from "react";
import EditItem from "./Tabs/EditItemTab";
import NotesTab from "./Tabs/NotesTab";

export const itemManagerTabs = (item) => [
  {
    key: "details",
    label: " Item Details",
    children: <EditItem item={item} />,
  },
  {
    key: "notes",
    label: "Notes",
    children: <NotesTab item={item} />,
  },
];
