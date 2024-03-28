import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useItems from "../hooks/useItems";
import { Flex, Modal, Space } from "antd";
import ItemCard from "../components/Items/ItemCard";
import FormModalButton from "../components/UI/FormModalButton";
import { AppstoreAddOutlined, SaveOutlined } from "@ant-design/icons";
import CreateItemForm from "../components/Forms/ItemForms/CreateItemForm";
import ItemDetailAutoSave from "../components/Items/ItemDetailAutoSave";
import DrawerManager from "../components/UI/DrawerManager";
import { itemManagerTabs } from "../components/Items/ManageItemsDrawer/itemManager";

export default function ProjectDetailsPage({ children }) {
  const { projectId } = useParams();
  const [manageItem, setManageItem] = useState(null);
  const { items, itemsLoading, createItem, selectedItem, setSelectedItem } =
    useItems({
      projectId,
    });

  const handleCreateItem = async (form) => {
    await createItem(form);
  };
  return (
    <Space direction="vertical">
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
      <Flex gap={20} wrap="wrap">
        {!itemsLoading &&
          items.map((item) => {
            return (
              <ItemCard
                item={item}
                setItem={setSelectedItem}
                key={item.id}
                setItemManager={setManageItem}
              />
            );
          })}
      </Flex>
      <Modal
        open={selectedItem}
        onCancel={() => setSelectedItem(null)}
        title={selectedItem?.name || null}
        width={1000}
        footer={null}
        icon={<SaveOutlined />}
        header="HELLO"
      >
        <ItemDetailAutoSave item={selectedItem} />
      </Modal>
      <DrawerManager
        item={manageItem}
        open={!!manageItem}
        onClose={() => setManageItem(null)}
        tabItems={itemManagerTabs(manageItem)}
      />
    </Space>
  );
}
