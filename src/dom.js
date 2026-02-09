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
export const $ = (selector, context = document) => {
  return context.querySelector(selector);
};

/**
 * querySelectorAll wrapper that returns an array instead of a NodeList
 * @param {string} selector
 * @param {HTMLElement|Document} context
 * @returns {HTMLElement[]}
 */
export const $$ = (selector, context = document) => {
  return Array.from(context.querySelectorAll(selector));
};

/**
 * Create element with attributes and styles
 * @param {string} tag
 * @param {Object} options
 * @returns {HTMLElement}
 */
export const create = (tag, options = {}) => {
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
export const on = (parent, event, selector, handler) => {
  parent.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e, target);
    }
  });
};
