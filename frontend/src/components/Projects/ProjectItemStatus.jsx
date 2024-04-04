import React from "react";
import { Flex, Progress, Tag } from "antd";
import { capitalize } from "../../utils/utilFunctions";
import { ItemStatusColors, ItemStatusProgression } from "../../utils/constants";

export default function ProjectItemStatus({ item, style }) {
  return (
    <Flex
      gap={15}
      align="center"
      justify="space-between"
      style={{ width: "100%" }}
    >
      <strong style={{ width: "33%" }}>{capitalize(item.name)}</strong>
      <Progress
        style={{ width: "33%" }}
        steps={ItemStatusProgression.length}
        percent={
          ((ItemStatusProgression.indexOf(item.status) + 1) /
            ItemStatusProgression.length) *
          100
        }
        format={() => <></>}
      />
      <div style={{ width: "33%", display: "flex", justifyContent: "center" }} >
        <Tag color={ItemStatusColors[item.status]}>
          {capitalize(item.status)}
        </Tag>
      </div>
    </Flex>
  );
}
