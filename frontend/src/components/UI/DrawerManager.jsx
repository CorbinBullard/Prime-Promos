import React, { useEffect } from "react";
import { Drawer, Tabs } from "antd";

const { TabPane } = Tabs;

const ManagerDrawer = ({ open, onClose, item, tabItems }) => {
  useEffect(() => {
    if (open && !item) {
      onClose();
    }
  }, [open, item, onClose]);
  
  return (
    <Drawer placement="right" onClose={onClose} open={open} width={700}>
      {item && <Tabs item={item} items={tabItems} />}
    </Drawer>
  );
};

export default ManagerDrawer;
