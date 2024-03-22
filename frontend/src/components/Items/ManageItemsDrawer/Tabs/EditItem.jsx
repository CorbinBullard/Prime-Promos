import useItems from "../../../../hooks/useItems";
import React from "react";
import CreateItemForm from "../../../Forms/ItemForms/CreateItemForm";
import { Button, Form } from "antd";

export default function EditItem({ item }) {
  const [form] = Form.useForm();
  const { updateItem } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  const handleUpdateItem = async () => {
    form.validateFields().then((values) => {
      console.log(values);
      updateItem(values);
    });
  };
  return (
    <div>
      <CreateItemForm initialValues={item} form={form} />
      <Button type="primary" onClick={handleUpdateItem}>
        Update Item
      </Button>
    </div>
  );
}
