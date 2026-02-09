import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getParam,
  getQueryParams,
  updateParam,
  isAbsoluteURL,
} from "../src/url.js";
import { JSDOM } from "jsdom";

describe("url", () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM("<!DOCTYPE html>", {
      url: "https://example.com/page?test=1&foo=bar",
    });
    vi.stubGlobal("window", dom.window);
    vi.stubGlobal("document", dom.window.document);
    vi.stubGlobal("location", dom.window.location);
    vi.stubGlobal("history", dom.window.history);
    vi.stubGlobal("URL", dom.window.URL);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getParam", () => {
    it("should get query param", () => {
      expect(getParam("test")).toBe("1");
    });
  });

  describe("getQueryParams", () => {
    it("should get all params", () => {
      expect(getQueryParams()).toEqual({ test: "1", foo: "bar" });
    });
  });

  describe("isAbsoluteURL", () => {
    it("should detect absolute URLs", () => {
      expect(isAbsoluteURL("https://example.com")).toBe(true);
      expect(isAbsoluteURL("/path/to/resource")).toBe(false);
    });
  });
});
