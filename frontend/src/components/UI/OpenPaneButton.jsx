import { Button, Drawer } from "antd";
import React, { useState } from "react";

export default function OpenPaneButton({
  children,
  onClose,
  title,
  buttonText,
  icon,
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} icon={icon}>
        {buttonText}
      </Button>
      <Drawer open={open} title={title}>
        {children}
      </Drawer>
    </>
  );
}
