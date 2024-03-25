import ItemInProductionForm from "../components/Forms/ItemForms/ItemInProductionForm";
import ItemOrderForm from "../components/Forms/ItemForms/ItemOrderForm";
import ItemQuoteForm from "../components/Forms/ItemForms/ItemQuoteForm";
import ItemShippedForm from "../components/Forms/ItemForms/ItemShippedForm";

export const ItemStatusColors = {
  quote: "blue",
  order: "red",
  isProduction: "orange",
  shipped: "yellow",
  delivered: "green",
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
  isProduction: ItemInProductionForm,
  shipped: ItemShippedForm,
  delivered: <div>Delivered Form</div>,
};

const quoteItemList = [
  "itemNumber",
  "quantity",
  "sellUnitPrice",
  "itemColor",
  "logo",
  "logoColor",
  "stockCheck",
  "netUnitPrice",
  "netSetup",
  "proofCharge",
  "pmsCharge",
  "decorationMethod",
  "numberOfImprintColors",
  "productionTime",
  "shippingEstimate",
];
const orderItemList = [
  "factory",
  "primePO",
  // "orderSent",
  "preVirtual",
  "shipDate",
  "tracking",
];
const isProductionItemList = [
  "recieveOrderAcknowledge",
  "proofForAprovalFile",
  "proofForAprovalDate",
  "prepaymentConfirmed",
  "delivered",
  "invoice",
  "tracking",
];

export const ItemStatusFields = {
  quote: quoteItemList,
  order: orderItemList,
  isProduction: isProductionItemList,
  shipped: [],
  delivered: [],
};
