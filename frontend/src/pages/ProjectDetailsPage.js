import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useItems from "../hooks/useItems";
import { Flex, Modal } from "antd";
import ItemCard from "../components/Items/ItemCard";
import FormModalButton from "../components/UI/FormModalButton";
import { AppstoreAddOutlined } from "@ant-design/icons";
import CreateItemForm from "../components/Forms/ItemForms/CreateItemForm";
import CurrentItemModal from "../components/Items/CurrentItemModal";

export default function ProjectDetailsPage({ children }) {
  const { projectId } = useParams();
  const { items, itemsLoading, createItem, selectedItem, setSelectedItem } =
    useItems({
      projectId,
    });



  const handleCreateItem = async (form) => {
    await createItem(form);
  };
  return (
    <>
      <FormModalButton
        form={CreateItemForm}
        onSubmit={handleCreateItem}
        type="primary"
        title="Create New Item"
        submitText="Create"
        icon={<AppstoreAddOutlined />}
      >
        Add New Item
      </FormModalButton>
      <Flex gap={20}>
        {!itemsLoading &&
          items.map((item) => {
            return (
              <ItemCard item={item} setItem={setSelectedItem} key={item.id} />
            );
          })}
      </Flex>
      {selectedItem && (
        <CurrentItemModal
          item={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
}
