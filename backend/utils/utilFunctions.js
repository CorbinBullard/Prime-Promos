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

function getItemQuotePercentage(item) {
  let total = 0;
  quoteItemList.forEach((key) => {
    if (item[key]) {
      total += 1;
    }
  });
  return Math.floor((total / quoteItemList.length) * 100);
}
module.exports = { getItemQuotePercentage };
