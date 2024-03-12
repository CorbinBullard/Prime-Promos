import { Flex, List } from "antd";
import React from "react";

export default function ManageMembers({ project }) {
  return (
    <Flex>
      <div style={{ width: "100%" }}>
        <h3>Current Project Members</h3>
        <List></List>
      </div>
    </Flex>
  );
}
