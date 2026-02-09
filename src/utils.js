/**
 * General Utilities
 * Common helper functions.
 */

/**
 * Debounce function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * Throttle function
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
export const throttle = (fn, limit = 300) => {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      fn.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            fn.apply(this, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
};

/**
 * Deep clone an object
 * @param {any} obj
 * @returns {any}
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generates a simple UUID-like string
 * @returns {string}
 */
export const uuid = () => {
  return (
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36).substring(2, 6)
  );
};
