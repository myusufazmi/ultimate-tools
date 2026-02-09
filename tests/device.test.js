import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { isMobile, getOS, isDarkMode, copyToClipboard } from "../src/device.js";

describe("device", () => {
  beforeEach(() => {
    vi.stubGlobal("navigator", { userAgent: "test" });
    vi.stubGlobal("window", { matchMedia: vi.fn(), match: vi.fn() });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("isMobile", () => {
    it("should detect mobile devices", () => {
      vi.stubGlobal("navigator", {
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
      });
      expect(isMobile()).toBe(true);

      vi.stubGlobal("navigator", {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      });
      expect(isMobile()).toBe(false);
    });
  });

  describe("getOS", () => {
    it("should detect OS", () => {
      vi.stubGlobal("navigator", {
        userAgent: "Mozilla/5.0 (Windows NT 10.0)",
      });
      expect(getOS()).toBe("Windows");

      vi.stubGlobal("navigator", {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      });
      expect(getOS()).toBe("Mac");
    });
  });

  describe("isDarkMode", () => {
    it("should detect dark mode preference", () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
      }));
      expect(isDarkMode()).toBe(true);
    });
  });

  describe("copyToClipboard", () => {
    it("should use navigator.clipboard if available", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      });

      const result = await copyToClipboard("test");
      expect(result).toBe(true);
      expect(writeText).toHaveBeenCalledWith("test");
    });

    it("should return false on error", async () => {
      const writeText = vi.fn().mockRejectedValue(new Error("Failed"));
      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      });

      const result = await copyToClipboard("test");
      expect(result).toBe(false);
    });
  });
});
