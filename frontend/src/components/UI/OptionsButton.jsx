import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React from "react";

export default function OptionsButton({ items = [] }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleMenuItemClick = (e, onClick) => {
    e.domEvent.stopPropagation();
    if (onClick) onClick(e);
  };
  const menu = (
    <Menu
      items={items.map(({ key, label, onClick, icon, disabled }) => ({
        icon,
        key,
        label,
        onClick: (e) => handleMenuItemClick(e, onClick),
        disabled,
      }))}
    />
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
      <Button type="text" icon={<MenuOutlined />} onClick={handleClick} />
    </Dropdown>
  );
}
