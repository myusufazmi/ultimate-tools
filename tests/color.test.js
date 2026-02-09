import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  lighten,
  darken,
  randomColor,
} from "../src/color.js";

describe("color", () => {
  describe("hexToRgb", () => {
    it("should convert hex to rgb", () => {
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should return null for invalid hex", () => {
      expect(hexToRgb("invalid")).toBeNull();
    });
  });

  describe("rgbToHex", () => {
    it("should convert rgb to hex", () => {
      expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
    });
  });

  describe("lighten", () => {
    it("should lighten a color", () => {
      // Approximate check due to implementation details
      const lighter = lighten("#000000", 50);
      expect(lighter).toMatch(/^#[0-9a-f]{6}$/i);
      expect(lighter).not.toBe("#000000");

      expect(lighten("#ffffff", 10)).toBe("#ffffff"); // Clamping
    });
  });

  describe("darken", () => {
    it("should darken a color", () => {
      const darker = darken("#ffffff", 50);
      expect(darker).toMatch(/^#[0-9a-f]{6}$/i);
      expect(darker).not.toBe("#ffffff");

      expect(darken("#000000", 10)).toBe("#000000"); // Clamping
    });
  });

  describe("randomColor", () => {
    it("should generate a valid hex color", () => {
      const color = randomColor();
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});
