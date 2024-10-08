import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useItems from "../hooks/useItems";
import { Divider, Flex, Modal, Space } from "antd";
import ItemCard from "../components/Items/ItemCard";
import FormModalButton from "../components/UI/FormModalButton";
import { AppstoreAddOutlined, SaveOutlined } from "@ant-design/icons";
import CreateItemForm from "../components/Forms/ItemForms/CreateItemForm";
import ItemDetailAutoSave from "../components/Items/ItemDetailAutoSave";
import DrawerManager from "../components/UI/DrawerManager";
import { itemManagerTabs } from "../components/Items/ManageItemsDrawer/itemManager";
import { FORM_COMPONENTS } from "../utils/constants";
import NotesList from "../components/Notes/NotesList";
import BackButton from "../components/UI/BackButton";
import { useSession } from "../context/Session";
import ModalHeader from "../components/UI/ModalHeader";
import ItemStatusTag from "../components/UI/ItemStatusTag";
import ProjectTitle from "../components/UI/ProjectTitle";
import NotesTab from "../components/Items/ManageItemsDrawer/Tabs/NotesTab";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { isAdmin } = useSession();
  const [manageItemId, setManageItemId] = useState(null);

  const {
    items,
    itemsLoading,
    createItem,
    selectedItem,
    setSelectedItem,
    currentProject,
  } = useItems({
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

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {!itemsLoading && (
        <>
          <Flex justify="space-between" align="center">
            <BackButton text="Projects" type="text" link="/projects" />
            <ProjectTitle project={currentProject} />
            {isAdmin && (
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
            )}
          </Flex>
          <Divider />
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
            // Is This the best way to handle this?
            open={selectedItem && selectedItem.status !== "delivered"}
            onCancel={() => setSelectedItem(null)}
            title={
              <ModalHeader>
                <ModalHeader.Title title={selectedItem?.name} />
                <ModalHeader.Icon
                  Icon={ItemStatusTag}
                  iconProps={{ item: selectedItem }}
                />
              </ModalHeader>
            }
            width={1000}
            footer={null}
            icon={<SaveOutlined />}
            destroyOnClose
          >
            {selectedItem && (
              <Flex justify="space-between" gap={15}>
                <ItemDetailAutoSave
                  item={selectedItem}
                  FormComponent={FORM_COMPONENTS[selectedItem?.status]}
                />
                {!isAdmin ? (
                  <NotesList item={selectedItem} />
                ) : (
                  <NotesTab item={itemsObj[selectedItem.id]} />
                )}
              </Flex>
            )}
          </Modal>
          <DrawerManager
            open={!!manageItemId}
            onClose={() => setManageItemId(null)}
            item={itemsObj[manageItemId]}
            tabItems={itemManagerTabs(itemsObj[manageItemId])}
          />
        </>
      )}
    </Space>
  );
}
