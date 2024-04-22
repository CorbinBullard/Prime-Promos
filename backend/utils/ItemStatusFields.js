const quoteItemList = [
  "itemNumber",
  "spcNumber",
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
  "sellSetup",
];
const orderItemList = [
  "factory",
  "primePO",
  "preVirtual",
  "shipDate",
  // "tracking",
];
const productionItemList = [
  "receivedOrder",
  "proofApprovalFileUrl",
  "proofApprovalDate",
  "prepaymentConfirmed",
  "invoice",
  "tracking",
];

const shippedItemList = ["delivered"];

const ItemStatusFields = {
  quote: quoteItemList,
  order: orderItemList,
  production: productionItemList,
  shipped: shippedItemList,
};

module.exports = { ItemStatusFields };
