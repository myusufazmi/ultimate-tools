/**
 * Formatting Utilities
 * Tools for number, currency, and string formatting.
 */

/**
 * Currency Formatter
 * @param {number} amount
 * @param {string} locale - Default: 'id-ID'
 * @param {string} currency - Default: 'IDR'
 * @returns {string}
 */
export const currency = (amount, locale = "id-ID", currency = "IDR") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

/**
 * Number Formatter with decimals
 * @param {number} n
 * @param {number} decimals - Default: 0
 * @returns {string}
 */
export const number = (n, decimals = 0) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
};

/**
 * Truncate string with ellipsis
 * @param {string} str
 * @param {number} length - Default: 30
 * @returns {string}
 */
export const truncate = (str, length = 30) => {
  if (!str) return "";
  return str.length > length ? str.substring(0, length) + "..." : str;
};

/**
 * Convert string to slug (URL friendly)
 * @param {string} str
 * @returns {string}
 */
export const slugify = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Capitalize first letter of each word
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};
