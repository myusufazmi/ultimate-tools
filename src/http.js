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

export const http = {
  get: (url, options) => request(url, { ...options, method: "GET" }),
  post: (url, body, options) =>
    request(url, { ...options, method: "POST", body }),
  put: (url, body, options) =>
    request(url, { ...options, method: "PUT", body }),
  delete: (url, options) => request(url, { ...options, method: "DELETE" }),
};
