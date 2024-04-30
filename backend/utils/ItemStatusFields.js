const quoteItemList = [
  "itemNumber",
  "spcNumber",
  "quantity",
  "sellUnitPrice",
  "itemColor",
  "preVirtual",
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
  "logo",
  "shipDate",
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
