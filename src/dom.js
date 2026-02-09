/**
 * DOM Utilities
 * Fast, modern, and lightweight DOM helpers.
 */

/**
 * Enhanced querySelector
 * @param {string} selector
 * @param {Document|Element} context
 * @returns {Element|null}
 */
export const $ = (selector, context = document) =>
  context.querySelector(selector);

/**
 * Enhanced querySelectorAll (returns Array)
 * @param {string} selector
 * @param {Document|Element} context
 * @returns {Element[]}
 */
export const $$ = (selector, context = document) =>
  Array.from(context.querySelectorAll(selector));

/**
 * Create element with attributes and styles
 * @param {string} tag
 * @param {Object} options
 * @param {Object.<string, string>} [options.attr]
 * @param {Object.<string, string>} [options.style]
 * @param {string} [options.text]
 * @param {string} [options.html]
 * @param {Array<Element|string|Node>} [options.children]
 * @returns {Element}
 */
export const create = (tag, options = {}) => {
  const el = document.createElement(tag);
  if (options.attr) {
    Object.entries(options.attr).forEach(([k, v]) => el.setAttribute(k, v));
  }
  if (options.style) {
    Object.entries(options.style).forEach(([k, v]) => {
      // @ts-ignore
      el.style[k] = v;
    });
  }
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  if (options.children) {
    options.children.forEach((child) => {
      el.appendChild(
        typeof child === "string" ? document.createTextNode(child) : child,
      );
    });
  }
  return el;
};

/**
 * Event delegation helper
 * @param {Element|Document} parent
 * @param {string} event
 * @param {string} selector
 * @param {(e: Event, target: Element) => void} handler
 */
export const on = (parent, event, selector, handler) => {
  parent.addEventListener(event, (e) => {
    const target = /** @type {Element} */ (e.target);
    if (target.closest(selector)) {
      const matched = target.closest(selector);
      if (matched) handler(e, matched);
    }
  });
};
