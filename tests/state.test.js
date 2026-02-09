import { describe, it, expect, vi } from "vitest";
import { createStore } from "../src/state.js";

describe("state", () => {
  it("should allow subscription and updates", () => {
    const store = createStore(0);
    const subscriber = vi.fn();

    const unsubscribe = store.subscribe(subscriber);
    expect(subscriber).toHaveBeenCalledWith(0);

    store.update(1);
    expect(subscriber).toHaveBeenCalledWith(1);

    store.update((n) => n + 1);
    expect(subscriber).toHaveBeenCalledWith(2);

    expect(store.get()).toBe(2);

    unsubscribe();
    store.update(3);
    expect(subscriber).toHaveBeenCalledTimes(3); // Initial + 2 updates
  });
});
