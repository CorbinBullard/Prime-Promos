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

// month colors object
export const monthColors = {
  January: "#FF0000",
  February: "#FF4000",
  March: "#FF8000",
  April: "#FFBF00",
  May: "#FFFF00",
  June: "#BFFF00",
  July: "#80FF00",
  August: "#40FF00",
  September: "#00FF00",
  October: "#00FF40",
  November: "#00FF80",
  December: "#00FFBF",
};
