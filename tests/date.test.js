import { describe, it, expect } from "vitest";
import { formatDate, relativeTime, addDays, isSameDay } from "../src/date.js";

describe("date", () => {
  describe("formatDate", () => {
    it("should format dates correctly", () => {
      const d = new Date("2023-01-01T12:00:00");
      expect(formatDate(d, "YYYY-MM-DD")).toBe("2023-01-01");
      expect(formatDate(d, "DD/MM/YYYY")).toBe("01/01/2023");
    });

    it("should handle invalid dates", () => {
      expect(formatDate("invalid")).toBe("Invalid Date");
    });
  });

  describe("relativeTime", () => {
    it("should return relative time strings", () => {
      const now = new Date();
      expect(relativeTime(now)).toBe("just now");

      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      expect(relativeTime(fiveMinutesAgo)).toBe("5 minutes ago");
    });
  });

  describe("addDays", () => {
    it("should add days to a date", () => {
      const d = new Date("2023-01-01");
      const nextDay = addDays(d, 1);
      expect(formatDate(nextDay)).toBe("2023-01-02");
    });
  });

  describe("isSameDay", () => {
    it("should check if two dates are the same day", () => {
      const d1 = new Date("2023-01-01T10:00:00");
      const d2 = new Date("2023-01-01T15:00:00");
      const d3 = new Date("2023-01-02");

      expect(isSameDay(d1, d2)).toBe(true);
      expect(isSameDay(d1, d3)).toBe(false);
    });
  });
});
