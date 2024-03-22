import React from "react";
import { Drawer, Tabs } from "antd";

const { TabPane } = Tabs;

const ManagerDrawer = ({ open, onClose, itemId, tabItems }) => {
  return (
    <Drawer placement="right" onClose={onClose} open={open} width={720}>
      {itemId && <Tabs itemId={itemId} items={tabItems} />}
    </Drawer>
  );
};

export default ManagerDrawer;
