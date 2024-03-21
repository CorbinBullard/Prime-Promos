import { Button, Dropdown, Flex, Progress } from "antd";
import { ItemStatusProgression } from "../../utils/constants";
import React from "react";
import useItems from "../../hooks/useItems";

export default function ItemStatusChangeButton({ item }) {
  const statusIndex = ItemStatusProgression.indexOf(item.status);
  const { updateItem } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  const handleChangeStatus = (e) => {
    e.stopPropagation();
    const newStatus = ItemStatusProgression[statusIndex + 1];
    updateItem({ status: newStatus });
  };

  const items = [
    {
      key: "1",
      label: "1st item",
    },
    {
      key: "2",
      label: "2nd item",
    },
    {
      key: "3",
      label: "3rd item",
    },
  ];

  return (
    <Flex gap={15} justify="center" align="center">
      <Progress type="circle" percent={item.currentPercentage} size={50} />
      <Button
        menu={{ items }}
        onClick={handleChangeStatus}
        disabled={item.currentPercentage < 100}
      >
        Update to {ItemStatusProgression[statusIndex + 1]}
      </Button>
    </Flex>
  );
}
