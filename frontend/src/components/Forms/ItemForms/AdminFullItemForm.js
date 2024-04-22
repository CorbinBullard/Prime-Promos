import { Form, Input, Steps, Button } from "antd";
import React, { useMemo, useState } from "react";
import ItemQuoteForm from "./ItemQuoteForm";
import ItemOrderForm from "./ItemOrderForm";
import ItemInProductionForm from "./ItemInProductionForm";
import {
  FORM_COMPONENTS,
  ItemStatusFields,
  ItemStatusProgression,
} from "../../../utils/constants";
import ItemDetailAutoSave from "../../Items/ItemDetailAutoSave";
import CreateItemForm from "./CreateItemForm";
const { Item } = Form;
export default function AdminFullItemForm({ form, item }) {
  const current = ItemStatusProgression.indexOf(item.status);
  const itemValues = useMemo(() => {
    const obj = {};
    for (const status in ItemStatusFields) {
      obj[status] = {};
      for (const field of ItemStatusFields[status]) {
        obj[status][field] = item[field];
      }
    }
    return obj;
  }, [item]);
  const items = [
    {
      title: "Quote",
      description: (
        <ItemDetailAutoSave
          FormComponent={FORM_COMPONENTS.quote}
          initialValues={itemValues.quote}
          item={item}
        />
      ),
    },
    {
      title: "Order",
      description: (
        <ItemDetailAutoSave
          FormComponent={FORM_COMPONENTS.order}
          initialValues={itemValues.order}
          item={item}
        />
      ),
    },
    {
      title: "In Production",
      description: (
        <ItemDetailAutoSave
          FormComponent={FORM_COMPONENTS.production}
          initialValues={itemValues.production}
          item={item}
        />
      ),
    },
  ];
  return (
    <>
      <ItemDetailAutoSave FormComponent={CreateItemForm} item={item} />
      <Steps
        direction="vertical"
        items={items}
        current={current}
        percent={item.currentPercentage}
      />
    </>
  );
}
