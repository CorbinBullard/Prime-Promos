import { Card, Flex, Modal, Progress, Tag } from "antd";
import React from "react";
import useItems from "../../hooks/useItems";
import OptionsButton from "../UI/OptionsButton";
import { capitalize } from "../../utils/utilFunctions";
import { ItemStatusColors } from "../../utils/constants";
import {
  MenuOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ItemStatusChangeButton from "./ItemStatusChangeButton";

export default function ItemCard({ item, setItem, setItemManager }) {
  const { deleteItem } = useItems({ projectId: item.projectId });

  const handleDelete = async () => {
    deleteItem(item.id);
  };
  const handleClick = () => {
    if (item.status === "delivered") return;
    setItem(item);
  };

  const itemOptions = [
    {
      key: "edit",
      label: "Edit Item",
      icon: <EditOutlined style={{ color: "skyblue" }} />,
      onClick: (e) => setItemManager(item),
    },
    {
      key: "delete",
      label: "Delete Item",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onClick: () =>
        Modal.confirm({
          title: "Delete Item",
          content: "Are you sure you want to delete this item?",
          onOk: handleDelete,
        }),
    },
  ];

  return (
    <>
      <Card
        style={{ width: 300 }}
        title={item.name}
        hoverable
        onClick={handleClick}
        extra={
          <>
            <Tag
              color={ItemStatusColors[item.status]}
              style={{ fontStyle: "italic" }}
            >
              {capitalize(item.status)}
            </Tag>
            <OptionsButton items={itemOptions} />
          </>
        }
      >
        <ItemStatusChangeButton item={item} />
      </Card>
    </>
  );
}
