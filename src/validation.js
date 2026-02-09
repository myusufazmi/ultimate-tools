/**
 * Validation Utilities
 * Common regex-based validation helpers.
 */

/**
 * Check if string is a valid email
 * @param {string} str
 * @returns {boolean}
 */
export const isEmail = (str) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(str);
};

/**
 * Check if string is a valid URL
 * @param {string} str
 * @returns {boolean}
 */
export const isURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string contains only numbers
 * @param {string} str
 * @returns {boolean}
 */
export const isNumeric = (str) => {
  return /^\d+$/.test(str);
};

/**
 * Check for strong password
 * (Min 8 chars, 1 uppercase, 1 lowercase, 1 number)
 * @param {string} str
 * @returns {boolean}
 */
export const isStrongPassword = (str) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(str);
};

/**
 * Check if string is empty or only whitespace
 * @param {string} str
 * @returns {boolean}
 */
export const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};
