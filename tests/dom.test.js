import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { $, $$, create, on } from "../src/dom.js";
import { JSDOM } from "jsdom";

describe("dom", () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(
      '<!DOCTYPE html><div id="app"><div class="child"></div></div>',
    );
    global.document = dom.window.document;
    global.window = dom.window;
    global.Node = dom.window.Node;
  });

  afterEach(() => {
    // cleanup
    vi.restoreAllMocks();
  });

  describe("$", () => {
    it("should select an element", () => {
      const el = $("#app");
      expect(el).not.toBeNull();
      expect(el.id).toBe("app");
    });
  });

  describe("$$", () => {
    it("should select multiple elements", () => {
      const els = $$("div");
      expect(els.length).toBe(2);
      expect(Array.isArray(els)).toBe(true);
    });
  });

  describe("create", () => {
    it("should create an element with options", () => {
      const el = create("div", {
        attr: { id: "new", "data-test": "value" },
        style: { color: "red" },
        text: "Hello",
      });

      expect(el.tagName).toBe("DIV");
      expect(el.id).toBe("new");
      expect(el.getAttribute("data-test")).toBe("value");
      expect(el.textContent).toBe("Hello");
    });
  });

  describe("on", () => {
    it("should delegate events", () => {
      const parent = document.createElement("div");
      const child = document.createElement("button");
      child.className = "btn";
      parent.appendChild(child);
      document.body.appendChild(parent);

      const handler = vi.fn();
      on(parent, "click", ".btn", handler);

      child.click();
      expect(handler).toHaveBeenCalled();
    });
  });
});
