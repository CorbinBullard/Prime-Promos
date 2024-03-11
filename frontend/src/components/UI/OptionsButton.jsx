import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React from "react";

export default function OptionsButton({ items }) {
  const menu = (
    <Menu
      items={items.map(({ key, label, onClick, icon, disabled }) => ({
        icon,
        key,
        label,
        onClick,
        disabled,
      }))}
    />
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
      <Button type="text" icon={<MenuOutlined />} />
    </Dropdown>
  );
}
