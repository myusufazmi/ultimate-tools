/**
 * URL Utilities
 * Easy query parameter manipulation and URL helpers.
 */

/**
 * Get a query parameter value from URL
 * @param {string} key
 * @param {string} [url] - Default: window.location.href
 * @returns {string|null}
 */
export const getParam = (key, url = window.location.href) => {
  const searchParams = new URL(url).searchParams;
  return searchParams.get(key);
};

/**
 * Get all query parameters as an object
 * @param {string} [url] - Default: window.location.href
 * @returns {Object.<string, string>}
 */
export const getQueryParams = (url = window.location.href) => {
  const searchParams = new URL(url).searchParams;
  /** @type {Object.<string, string>} */
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

/**
 * Update a query parameter in the URL without reloading
 * @param {string} key
 * @param {string|null} value
 */
export const updateParam = (key, value) => {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  window.history.pushState({}, "", url);
};

/**
 * Remove a query parameter
 * @param {string} key
 */
export const removeParam = (key) => {
  updateParam(key, null);
};

/**
 * Determine if URL is absolute
 * @param {string} url
 * @returns {boolean}
 */
export const isAbsoluteURL = (url) => {
  return /^[a-z][a-z0-9+.-]*:/.test(url);
};
