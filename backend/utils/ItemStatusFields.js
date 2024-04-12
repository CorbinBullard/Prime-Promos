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
  "preVirtual",
  "shipDate",
  // "tracking",
];
const isProductionItemList = [
  "recieveOrderAcknowledge",
  "proofForAprovalFile",
  "proofForAprovalDate",
  "prepaymentConfirmed",
  "invoice",
  "tracking",
];

const shippedItemList = ["delivered"];

const ItemStatusFields = {
  quote: quoteItemList,
  order: orderItemList,
  isProduction: isProductionItemList,
  shipped: shippedItemList,
};

module.exports = { ItemStatusFields };
