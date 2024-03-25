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
  "tracking"
];

const ItemStatusFields = {
  quote: quoteItemList,
  order: orderItemList,
  isProduction: isProductionItemList,
  shipped: [],
  delivered: [],
};


module.exports = { ItemStatusFields };
