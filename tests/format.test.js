import { describe, it, expect } from "vitest";
import {
  currency,
  number,
  truncate,
  slugify,
  capitalize,
} from "../src/format.js";

describe("format", () => {
  describe("currency", () => {
    it("should format currency", () => {
      // Note: exact output might depend on node version/locale data, but generally IDR format is consistent
      expect(currency(10000).replace(/\s/g, " ")).toMatch(/Rp\s10.000,00/);
    });
  });

  describe("number", () => {
    it("should format numbers", () => {
      expect(number(10000)).toBe("10.000");
      expect(number(10000.5, 2)).toBe("10.000,50");
    });
  });

  describe("truncate", () => {
    it("should truncate strings", () => {
      expect(truncate("hello world", 5)).toBe("hello...");
      expect(truncate("hello", 10)).toBe("hello");
    });
  });

  describe("slugify", () => {
    it("should slugify strings", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("Hello World!")).toBe("hello-world");
    });
  });

  describe("capitalize", () => {
    it("should capitalize strings", () => {
      expect(capitalize("hello world")).toBe("Hello World");
    });
  });
});
