import moment from "moment";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
