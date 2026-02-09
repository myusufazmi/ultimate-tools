/**
 * Storage Utilities
 * Wrapper for LocalStorage and SessionStorage with JSON support.
 */

/**
 * @param {Storage} provider
 */
const createStorage = (provider) => ({
  /**
   * Set a value in storage
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    try {
      provider.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to storage", e);
    }
  },

  /**
   * Get a value from storage
   * @template T
   * @param {string} key
   * @param {T} [fallback]
   * @returns {T}
   */
  get(key, fallback = undefined) {
    try {
      const item = provider.getItem(key);
      // @ts-ignore
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.error("Error reading from storage", e);
      // @ts-ignore
      return fallback;
    }
  },

  /**
   * Remove a value from storage
   * @param {string} key
   */
  remove(key) {
    provider.removeItem(key);
  },

  /**
   * Clear all storage
   */
  clear() {
    provider.clear();
  },
});

/**
 * @param {string} type
 * @returns {Storage}
 */
const getProvider = (type) => {
  try {
    // @ts-ignore
    if (typeof window !== "undefined" && window[type]) {
      // @ts-ignore
      return window[type];
    }
  } catch (e) {
    // ignore
  }
  // Mock fallback for Node/Test environment
  // @ts-ignore
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
};

export const local = createStorage(getProvider("localStorage"));
export const session = createStorage(getProvider("sessionStorage"));
