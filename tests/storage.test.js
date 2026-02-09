import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { local, session } from "../src/storage.js";

describe("storage", () => {
  beforeEach(() => {
    // Clear storage before each test
    localStorage.clear();
    sessionStorage.clear();
  });

  it("should set and get values", () => {
    local.set("key", { a: 1 });

    // Check if value actually landed in localStorage
    const raw = localStorage.getItem("key");
    expect(raw).toBe(JSON.stringify({ a: 1 }));

    // Verify end-to-end behavior
    const val = local.get("key");
    expect(val).toEqual({ a: 1 });
  });

  it("should return fallback if item missing", () => {
    const val = local.get("missing", "default");
    expect(val).toBe("default");
  });
});
