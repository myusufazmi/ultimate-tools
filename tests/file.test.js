import { describe, it, expect, vi } from "vitest";
import {
  toBase64,
  getFileExtension,
  isImage,
  formatFileSize,
} from "../src/file.js";

describe("file", () => {
  describe("getFileExtension", () => {
    it("should get file extension", () => {
      expect(getFileExtension("image.png")).toBe("png");
      expect(getFileExtension("archive.tar.gz")).toBe("gz");
    });
  });

  describe("formatFileSize", () => {
    it("should format file sizes", () => {
      expect(formatFileSize(1024)).toBe("1 KB");
      expect(formatFileSize(1024 * 1024)).toBe("1 MB");
      expect(formatFileSize(500)).toBe("500 Bytes");
    });
  });

  // Note: Testing FileReader and Image loading in Node environment (even with jsdom) can be tricky/require more mocking.
  // For now, testing the pure logic functions.
});
