import ItemInProductionForm from "../components/Forms/ItemForms/ItemInProductionForm";
import ItemOrderForm from "../components/Forms/ItemForms/ItemOrderForm";
import ItemQuoteForm from "../components/Forms/ItemForms/ItemQuoteForm";
import ItemShippedForm from "../components/Forms/ItemForms/ItemShippedForm";

export const ItemStatusColors = {
  quote: "blue",
  order: "red",
  production: "orange",
  shipped: "yellow",
  delivered: "green",
};

export const ItemStatusProgression = [
  "quote",
  "order",
  "production",
  "shipped",
  "delivered",
];

export const ItemStatusLabels = {
  quote: "Quote",
  order: "Order",
  production: "In Production",
  shipped: "Shipped",
  delivered: "Delivered",
};

export const FORM_COMPONENTS = {
  quote: ItemQuoteForm,
  order: ItemOrderForm,
  production: ItemInProductionForm,
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
  "proofApprovalFileUrl",
  "proofApprovalDate",
  "prepaymentConfirmed",
  "invoice",
  "tracking",
];
const shippedItemList = ["delivered"];

export const ItemStatusFields = {
  quote: quoteItemList,
  order: orderItemList,
  isProduction: isProductionItemList,
  shipped: shippedItemList,
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

export const dateFormat = "MM/DD/YYYY";

export const formItemLayout = {
  style: { width: "100%", marginBottom: "2px" }, // Apply width to the layout
};
