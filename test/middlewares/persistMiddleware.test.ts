import { describe, it, expect, vi, beforeEach } from "vitest";
import { persistMiddleware } from "../../src";

type State = { count: number };

describe("persistMiddleware", () => {
  const storageKey = "testKey";

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should initialize state from localStorage", () => {
    localStorage.setItem(storageKey, JSON.stringify({ count: 10 }));

    let state: State = { count: 0 };
    const get = () => state;
    const set = (val: Partial<State>) => {
      state = { ...state, ...val };
    };

    persistMiddleware<State>(storageKey)(set, get);

    expect(state).toEqual({ count: 10 });
  });

  it("should save state to localStorage on set", () => {
    let state: State = { count: 0 };
    const get = () => state;
    const baseSet = (val: Partial<State>) => {
      state = { ...state, ...val };
    };

    const { set } = persistMiddleware<State>(storageKey)(baseSet, get);

    set({ count: 5 });

    expect(localStorage.getItem(storageKey)).toEqual(
      JSON.stringify({ count: 5 })
    );
    expect(state).toEqual({ count: 5 });
  });

  it("should update state on localStorage event", () => {
    let state: State = { count: 0 };
    const get = () => state;
    const set = (val: Partial<State>) => {
      state = { ...state, ...val };
    };

    persistMiddleware<State>(storageKey)(set, get);

    const event = new StorageEvent("storage", {
      key: storageKey,
      newValue: JSON.stringify({ count: 20 }),
    });

    // Dispatch event
    window.dispatchEvent(event);

    expect(state).toEqual({ count: 20 });
  });
});
