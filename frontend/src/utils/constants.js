import ItemOrderForm from "../components/Forms/ItemForms/ItemOrderForm";
import ItemQuoteForm from "../components/Forms/ItemForms/ItemQuoteForm";

export const ItemStatusColors = {
  quote: "blue",
  order: "green",
  delivered: "purple",
};

export const ItemStatusProgression = [
  "quote",
  "order",
  "isProduction",
  "shipped",
  "delivered",
];

export const ItemStatusLabels = {
  quote: "Quote",
  order: "Order",
  isProduction: "In Production",
  shipped: "Shipped",
  delivered: "Delivered",
};

export const FORM_COMPONENTS = {
  quote: ItemQuoteForm,
  order: ItemOrderForm,
  isProduction: <div>Production Form</div>,
  shipped: <div>Shipped Form</div>,
  delivered: <div>Delivered Form</div>,
};
