import { describe, it, expect, vi, afterEach } from "vitest";
import { http } from "../src/http.js";

global.fetch = vi.fn();

describe("http", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should make GET requests", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ data: "success" }),
    });

    const data = await http.get("/api/test");
    expect(fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({ method: "GET" }),
    );
    expect(data).toEqual({ data: "success" });
  });

  it("should make POST requests", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ id: 1 }),
    });

    const data = await http.post("/api/test", { name: "Test" });
    expect(fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Test" }),
      }),
    );
    expect(data).toEqual({ id: 1 });
  });

  it("should handle errors", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Error" }),
    });

    await expect(http.get("/error")).rejects.toEqual({
      status: 500,
      message: "Error",
    });
  });
});
