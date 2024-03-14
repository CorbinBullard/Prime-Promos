import { Drawer } from "antd";
import React from "react";



export default function index({ project, deselectProject }) {

  return (
    <Drawer open={!!project} onClose={deselectProject} width={500}>
      HELLO
    </Drawer>
  );
}
