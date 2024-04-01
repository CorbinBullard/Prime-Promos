import React from "react";
import { Progress, Flex, Tag, Button } from "antd";
import {
  ItemStatusColors,
  ItemStatusProgression,
} from "../../../../utils/constants";
import { capitalize } from "../../../../utils/utilFunctions";


export default function ProjectStatusTab({ project }) {
  console.log(project);
  return (
    <Flex vertical gap={15}>
      {project.Items.map((item) => (
        <Flex gap={15}>
          <strong>{capitalize(item.name)}</strong>
          <Progress
            steps={ItemStatusProgression.length}
            percent={
              (ItemStatusProgression.indexOf(item.status) /
                (ItemStatusProgression.length - 1)) *
              100
            }
            format={() => (
              <Tag color={ItemStatusColors[item.status]}>
                {capitalize(item.status)}
              </Tag>
            )}
          />
        </Flex>
      ))}
      <Button type="primary">Mark as Complete</Button>
    </Flex>
  );
}
