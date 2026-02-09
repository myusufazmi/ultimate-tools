import { describe, it, expect } from "vitest";
import {
  isEmail,
  isURL,
  isNumeric,
  isStrongPassword,
  isEmpty,
} from "../src/validation.js";

describe("validation", () => {
  describe("isEmail", () => {
    it("should validate email addresses", () => {
      expect(isEmail("test@example.com")).toBe(true);
      expect(isEmail("invalid-email")).toBe(false);
    });
  });

  describe("isURL", () => {
    it("should validate URLs", () => {
      expect(isURL("https://example.com")).toBe(true);
      expect(isURL("invalid-url")).toBe(false);
    });
  });

  describe("isNumeric", () => {
    it("should validate numeric strings", () => {
      expect(isNumeric("123")).toBe(true);
      expect(isNumeric("123a")).toBe(false);
    });
  });

  describe("isStrongPassword", () => {
    it("should validate strong passwords", () => {
      expect(isStrongPassword("StrongPass1")).toBe(true);
      expect(isStrongPassword("weak")).toBe(false);
    });
  });

  describe("isEmpty", () => {
    it("should validate empty strings", () => {
      expect(isEmpty("")).toBe(true);
      expect(isEmpty("   ")).toBe(true);
      expect(isEmpty("not empty")).toBe(false);
    });
  });
});
