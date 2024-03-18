import { Form, Modal } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect } from "react";
import ItemQuoteForm from "../Forms/ItemQuoteForm";
import useItems from "../../hooks/useItems";
import { debounce } from "../../utils/utilFunctions";

export default function CurrentItemModal({
  item,
  setSelectedItem,
  selectedItem,
}) {
  const [form] = Form.useForm();
  const { updateItem } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  const saveFormData = async (changedValues, allValues) => {
    // Implement save logic here, e.g., API call to save allValues
    console.log("Saving form data", changedValues);
    console.log("Saving form data", allValues);
    await updateItem(allValues);
    // Remember to handle API response and errors appropriately
  };

  const debouncedSave = useCallback(debounce(saveFormData, 1000), []);

  return (
    <Modal
      open={item}
      onCancel={() => setSelectedItem(null)}
      title={item.name}
      width={1000}
      footer={null}
      icon={<SaveOutlined />}
    >
      <div style={{ width: "40%" }}>
        <ItemQuoteForm
          form={form}
          onValuesChange={debouncedSave}
          initialValues={item}
        />
      </div>
    </Modal>
  );
}
