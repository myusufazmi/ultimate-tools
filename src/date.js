/**
 * Date Utilities
 * Simple and efficient date formatting and manipulation.
 */

/**
 * Basic Date Formatter
 * @param {Date|string|number} date
 * @param {string} [pattern] - Default: 'YYYY-MM-DD'
 * @returns {string}
 */
export const formatDate = (date, pattern = "YYYY-MM-DD") => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  /** @type {Object.<string, string|number>} */
  const map = {
    YYYY: d.getFullYear(),
    MM: String(d.getMonth() + 1).padStart(2, "0"),
    DD: String(d.getDate()).padStart(2, "0"),
    HH: String(d.getHours()).padStart(2, "0"),
    mm: String(d.getMinutes()).padStart(2, "0"),
    ss: String(d.getSeconds()).padStart(2, "0"),
  };

  return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) =>
    String(map[matched]),
  );
};

/**
 * Returns a human-readable relative time (e.g., "5 minutes ago")
 * @param {Date|string|number} date
 * @returns {string}
 */
export const relativeTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;

  return formatDate(d);
};

/**
 * Add days to a date
 * @param {Date|string|number} date
 * @param {number} days
 * @returns {Date}
 */
export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Check if two dates are the same day
 * @param {Date} d1
 * @param {Date} d2
 * @returns {boolean}
 */
export const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
