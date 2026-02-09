/**
 * General Utilities
 * Common helper functions.
 */

/**
 * Debounce a function
 * @template {Function} T
 * @param {T} func
 * @param {number} delay
 * @returns {(...args: any[]) => void}
 */
export const debounce = (func, delay) => {
  /** @type {ReturnType<typeof setTimeout> | null} */
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // @ts-ignore
      func.apply(null, args);
    }, delay);
  };
};

/**
 * Throttle a function
 * @template {Function} T
 * @param {T} func
 * @param {number} limit
 * @returns {(...args: any[]) => void}
 */
export const throttle = (func, limit) => {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let lastFunc;
  /** @type {number | undefined} */
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      // @ts-ignore
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - (lastRan || 0) >= limit) {
            // @ts-ignore
            func.apply(null, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - (lastRan || 0)),
      );
    }
  };
};

/**
 * Deep clone an object
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate a UUID
 * @returns {string}
 */
export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
