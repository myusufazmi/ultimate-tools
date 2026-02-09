/**
 * State Management
 * A tiny reactive store (inspired by Svelte stores).
 */

/**
 * Creates a reactive store
 * @param {any} initialValue
 * @returns {Object}
 */
export const createStore = (initialValue) => {
  let value = initialValue;
  const subscribers = new Set();

  /**
   * Subscribe to changes
   * @param {Function} fn
   * @returns {Function} Unsubscribe function
   */
  const subscribe = (fn) => {
    subscribers.add(fn);
    fn(value);
    return () => subscribers.delete(fn);
  };

  /**
   * Update value and notify subscribers
   * @param {any|Function} newValue
   */
  const update = (newValue) => {
    if (typeof newValue === "function") {
      value = newValue(value);
    } else {
      value = newValue;
    }
    subscribers.forEach((fn) => fn(value));
  };

  /**
   * Get current value
   * @returns {any}
   */
  const get = () => value;

  return { subscribe, update, get };
};
