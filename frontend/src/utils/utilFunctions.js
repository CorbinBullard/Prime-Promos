import moment from "moment";
import { priceCodes } from "./constants";

export function capitalize(str) {
  if (!str) return "";
  const strArr = str.split(" ");
  return strArr
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatDateForForm(date) {
  return date ? moment(date) : null;
}

export function validatePrices({ net, sell, code }) {
  const percent = priceCodes[code];

  if (!net || !percent || !sell) {
    return;
  }

  const calculatedSellUnitPrice = net / (1 - percent / 100);
  if (calculatedSellUnitPrice !== sell) {
    return "error";
  } else return "success";
}
