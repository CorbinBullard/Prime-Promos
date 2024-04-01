import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React from "react";
import { useSession } from "../../context/Session";

export default function OptionsButton({ items = [] }) {
  const { isAdmin } = useSession();
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
  if (!isAdmin) return null;
  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
      <Button type="text" icon={<MenuOutlined />} onClick={handleClick} />
    </Dropdown>
  );
}
