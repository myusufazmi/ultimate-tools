/**
 * Storage Utilities
 * Type-safe and auto-serialized local/session storage.
 */

const createStorage = (type = "localStorage") => {
  const storage = window[type];

  return {
    /**
     * Set item with auto-serialization
     * @param {string} key
     * @param {any} value
     */
    set(key, value) {
      try {
        const serialized = JSON.stringify(value);
        storage.setItem(key, serialized);
      } catch (e) {
        console.error(`Storage Error (set): ${key}`, e);
      }
    },

    /**
     * Get item with auto-deserialization
     * @param {string} key
     * @param {any} fallback
     * @returns {any}
     */
    get(key, fallback = null) {
      try {
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.error(`Storage Error (get): ${key}`, e);
        return fallback;
      }
    },

    /**
     * Remove item
     * @param {string} key
     */
    remove(key) {
      storage.removeItem(key);
    },

    /**
     * Clear all items
     */
    clear() {
      storage.clear();
    },
  };
};

export const local = createStorage("localStorage");
export const session = createStorage("sessionStorage");
