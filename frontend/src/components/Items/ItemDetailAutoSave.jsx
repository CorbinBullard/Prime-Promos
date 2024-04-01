import { Form, Modal } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect } from "react";
import ItemQuoteForm from "../Forms/ItemForms/ItemQuoteForm";
import ItemOrderForm from "../Forms/ItemForms/ItemOrderForm";
import { FORM_COMPONENTS } from "../../utils/constants";
import useItems from "../../hooks/useItems";
import { debounce } from "../../utils/utilFunctions";

export default function ItemDetailAutoSave({ item, FormComponent }) {
  const [form] = Form.useForm();
  const { updateItem } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  const saveFormData = async (changedValues, allValues) => {
    // Implement save logic here, e.g., API call to save allValues
    await updateItem(allValues);
    // Remember to handle API response and errors appropriately
  };

  const debouncedSave = useCallback(debounce(saveFormData, 1000), []);

  return (
    <FormComponent
      form={form}
      item={item}
      onValuesChange={debouncedSave}
      initialValues={item}
    />
  );
}
