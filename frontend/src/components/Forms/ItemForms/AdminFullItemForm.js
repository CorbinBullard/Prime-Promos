import { Form, Input, Steps } from "antd";
import React, { useMemo, useState } from "react";
import ItemQuoteForm from "./ItemQuoteForm";
import ItemOrderForm from "./ItemOrderForm";
import ItemInProductionForm from "./ItemInProductionForm";
import {
  ItemStatusFields,
  ItemStatusProgression,
} from "../../../utils/constants";
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
        <ItemQuoteForm form={form} initialValues={itemValues.quote} />
      ),
    },
    {
      title: "Order",
      description: (
        <ItemOrderForm form={form} initialValues={itemValues.order} />
      ),
    },
    {
      title: "In Production",
      description: (
        <ItemInProductionForm
          form={form}
          initialValues={itemValues.inProduction}
        />
      ),
    },
  ];
  console.log(itemValues);
  return (
    <>
      <Form form={form} initialValues={{name: item.name}}>
        <Item name="name">
          <Input addonBefore="Item Name" />
        </Item>
      </Form>
      <Steps direction="vertical" items={items} current={current} />
    </>
  );
}
