/**
 * HTTP Utilities
 * Wrapper for Fetch API with JSON support by default.
 */

const base = {
  /** @type {(url: string, options: RequestInit) => Promise<any>} */
  async request(url, options) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw { status: response.status, ...error };
      }

      // Return JSON if possible, otherwise text
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      return response.text();
    } catch (error) {
      throw error;
    }
  },
};

export const http = {
  /**
   * GET request
   * @param {string} url
   * @param {RequestInit} [options]
   */
  get: (url, options = {}) => base.request(url, { method: "GET", ...options }),

  /**
   * POST request
   * @param {string} url
   * @param {any} body
   * @param {RequestInit} [options]
   */
  post: (url, body, options = {}) =>
    base.request(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  /**
   * PUT request
   * @param {string} url
   * @param {any} body
   * @param {RequestInit} [options]
   */
  put: (url, body, options = {}) =>
    base.request(url, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),

  /**
   * DELETE request
   * @param {string} url
   * @param {RequestInit} [options]
   */
  delete: (url, options = {}) =>
    base.request(url, { method: "DELETE", ...options }),
};
