'use strict';

/**
 * DOM Utilities
 * Premium query selectors and manipulation tools.
 */

/**
 * Higher performance querySelector wrapper
 * @param {string} selector
 * @param {HTMLElement|Document} context
 * @returns {HTMLElement|null}
 */
const $ = (selector, context = document) => {
  return context.querySelector(selector);
};

/**
 * querySelectorAll wrapper that returns an array instead of a NodeList
 * @param {string} selector
 * @param {HTMLElement|Document} context
 * @returns {HTMLElement[]}
 */
const $$ = (selector, context = document) => {
  return Array.from(context.querySelectorAll(selector));
};

/**
 * Create element with attributes and styles
 * @param {string} tag
 * @param {Object} options
 * @returns {HTMLElement}
 */
const create = (tag, options = {}) => {
  const el = document.createElement(tag);
  const {
    attr = {},
    style = {},
    text = "",
    html = "",
    children = [],
  } = options;

  Object.entries(attr).forEach(([k, v]) => el.setAttribute(k, v));
  Object.assign(el.style, style);

  if (text) el.textContent = text;
  if (html) el.innerHTML = html;

  children.forEach((child) => {
    if (child instanceof HTMLElement) el.appendChild(child);
    else el.append(child);
  });

  return el;
};

/**
 * Event delegation helper
 * @param {HTMLElement|Document} parent
 * @param {string} event
 * @param {string} selector
 * @param {Function} handler
 */
const on = (parent, event, selector, handler) => {
  parent.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e, target);
    }
  });
};

/**
 * HTTP Utilities
 * Clean Fetch API wrapper with easy JSON handling and interceptors.
 */

const request = async (url, options = {}) => {
  const {
    method = "GET",
    headers = {},
    body = null,
    interceptors = { request: [], response: [] },
  } = options;

  let config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body && typeof body === "object") {
    config.body = JSON.stringify(body);
  } else if (body) {
    config.body = body;
  }

  // Request Interceptors
  interceptors.request.forEach((fn) => {
    config = fn(config) || config;
  });

  try {
    const response = await fetch(url, config);
    let data = await response.json().catch(() => null);

    // Response Interceptors
    interceptors.response.forEach((fn) => {
      data = fn(data, response) || data;
    });

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

const http = {
  get: (url, options) => request(url, { ...options, method: "GET" }),
  post: (url, body, options) =>
    request(url, { ...options, method: "POST", body }),
  put: (url, body, options) =>
    request(url, { ...options, method: "PUT", body }),
  delete: (url, options) => request(url, { ...options, method: "DELETE" }),
};

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

const local = createStorage("localStorage");
const session = createStorage("sessionStorage");

/**
 * State Management
 * A tiny reactive store (inspired by Svelte stores).
 */

/**
 * Creates a reactive store
 * @param {any} initialValue
 * @returns {Object}
 */
const createStore = (initialValue) => {
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
const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(undefined, args), delay);
  };
};

/**
 * Throttle function
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
const throttle = (fn, limit = 300) => {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      fn.apply(undefined, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            fn.apply(undefined, args);
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
const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generates a simple UUID-like string
 * @returns {string}
 */
const uuid = () => {
  return (
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36).substring(2, 6)
  );
};

/**
 * Date Utilities
 * Simple and efficient date formatting and manipulation.
 */

/**
 * Basic Date Formatter
 * @param {Date|string|number} date
 * @param {string} pattern - Default: 'YYYY-MM-DD'
 * @returns {string}
 */
const formatDate = (date, pattern = "YYYY-MM-DD") => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  const map = {
    YYYY: d.getFullYear(),
    MM: String(d.getMonth() + 1).padStart(2, "0"),
    DD: String(d.getDate()).padStart(2, "0"),
    HH: String(d.getHours()).padStart(2, "0"),
    mm: String(d.getMinutes()).padStart(2, "0"),
    ss: String(d.getSeconds()).padStart(2, "0"),
  };

  return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
};

/**
 * Returns a human-readable relative time (e.g., "5 minutes ago")
 * @param {Date|string|number} date
 * @returns {string}
 */
const relativeTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);

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
const addDays = (date, days) => {
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
const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

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
const currency = (amount, locale = "id-ID", currency = "IDR") => {
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
const number = (n, decimals = 0) => {
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
const truncate = (str, length = 30) => {
  if (!str) return "";
  return str.length > length ? str.substring(0, length) + "..." : str;
};

/**
 * Convert string to slug (URL friendly)
 * @param {string} str
 * @returns {string}
 */
const slugify = (str) => {
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
const capitalize = (str) => {
  if (!str) return "";
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Validation Utilities
 * Common regex-based validation helpers.
 */

/**
 * Check if string is a valid email
 * @param {string} str
 * @returns {boolean}
 */
const isEmail = (str) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(str);
};

/**
 * Check if string is a valid URL
 * @param {string} str
 * @returns {boolean}
 */
const isURL = (str) => {
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
const isNumeric = (str) => {
  return /^\d+$/.test(str);
};

/**
 * Check for strong password
 * (Min 8 chars, 1 uppercase, 1 lowercase, 1 number)
 * @param {string} str
 * @returns {boolean}
 */
const isStrongPassword = (str) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(str);
};

/**
 * Check if string is empty or only whitespace
 * @param {string} str
 * @returns {boolean}
 */
const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};

exports.$ = $;
exports.$$ = $$;
exports.addDays = addDays;
exports.capitalize = capitalize;
exports.create = create;
exports.createStore = createStore;
exports.currency = currency;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.formatDate = formatDate;
exports.http = http;
exports.isEmail = isEmail;
exports.isEmpty = isEmpty;
exports.isNumeric = isNumeric;
exports.isSameDay = isSameDay;
exports.isStrongPassword = isStrongPassword;
exports.isURL = isURL;
exports.local = local;
exports.number = number;
exports.on = on;
exports.relativeTime = relativeTime;
exports.session = session;
exports.slugify = slugify;
exports.throttle = throttle;
exports.truncate = truncate;
exports.uuid = uuid;
//# sourceMappingURL=index.cjs.js.map
