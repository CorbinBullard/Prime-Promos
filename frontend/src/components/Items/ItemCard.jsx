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
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(item.id);
    }
  };

  const itemOptions = [
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined style={{ color: "skyblue" }} />,
      onClick: (e) => setItemManager(item),
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <Card
        style={{ width: 300 }}
        title={item.name}
        hoverable
        onClick={() => setItem(item)}
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
