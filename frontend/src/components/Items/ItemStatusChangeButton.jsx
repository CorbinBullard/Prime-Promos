import { Button, Dropdown, Flex, Progress } from "antd";
import { ItemStatusProgression } from "../../utils/constants";
import React from "react";
import useItems from "../../hooks/useItems";
import { useSession } from "../../context/Session";

export default function ItemStatusChangeButton({ item }) {
  const statusIndex = ItemStatusProgression.indexOf(item.status);
  const { isAdmin } = useSession();
  const { updateItem } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  const handleChangeStatus = (e) => {
    e.stopPropagation();
    const newStatus = ItemStatusProgression[statusIndex + 1];
    updateItem({ status: newStatus });
  };

  return (
    <Flex gap={15} justify="center" align="center">
      <Progress type="circle" percent={item.currentPercentage} size={50} />
      {isAdmin && item.status !== "delivered" && (
        <Button
          onClick={handleChangeStatus}
          disabled={item.currentPercentage < 100}
        >
          Update to {ItemStatusProgression[statusIndex + 1]}
        </Button>
      )}
    </Flex>
  );
}
