import { describe, it, expect, vi } from "vitest";
import { debounce, throttle, deepClone, uuid } from "../src/utils.js";

describe("utils", () => {
  describe("debounce", () => {
    it("should debounce function calls", async () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      expect(func).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe("throttle", () => {
    it("should throttle function calls", async () => {
      const func = vi.fn();
      const throttledFunc = throttle(func, 100);

      throttledFunc();
      throttledFunc();
      throttledFunc();

      expect(func).toHaveBeenCalledTimes(1);

      await new Promise((resolve) => setTimeout(resolve, 150));

      throttledFunc();

      expect(func).toHaveBeenCalledTimes(2);
    });
  });

  describe("deepClone", () => {
    it("should deep clone an object", () => {
      const obj = { a: 1, b: { c: 2 } };
      const clone = deepClone(obj);

      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj);
      expect(clone.b).not.toBe(obj.b);
    });
  });

  describe("uuid", () => {
    it("should generate a valid UUID", () => {
      const id = uuid();
      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });
  });
});
