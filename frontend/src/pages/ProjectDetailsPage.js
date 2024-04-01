import React, { useMemo, useState } from "react";
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
import { FORM_COMPONENTS } from "../utils/constants";
import NotesList from "../components/Notes/NotesList";

export default function ProjectDetailsPage({ children }) {
  const { projectId } = useParams();
  const [manageItemId, setManageItemId] = useState(null);

  const { items, itemsLoading, createItem, selectedItem, setSelectedItem } =
    useItems({
      projectId,
    });

  const handleCreateItem = async (form) => {
    await createItem(form);
  };

  const itemsObj = useMemo(() => {
    if (!items) return {};
    return items?.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }, [items]);

  console.log(itemsObj, itemsObj[manageItemId]);
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
                setItemManager={(item) => setManageItemId(item.id)}
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
        {selectedItem && (
          <Flex justify="space-between" gap={15}>
            <ItemDetailAutoSave
              item={selectedItem}
              FormComponent={FORM_COMPONENTS[selectedItem?.status]}
            />
            <NotesList item={selectedItem} />
          </Flex>
        )}
      </Modal>
      <DrawerManager
        open={!!manageItemId}
        onClose={() => setManageItemId(null)}
        item={itemsObj[manageItemId]}
        tabItems={itemManagerTabs(itemsObj[manageItemId])}
      />
    </Space>
  );
}
