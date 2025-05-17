import { describe, it, expect, vi } from "vitest";
import { createStore } from "../src";

type State = { count: number };

describe("createStore", () => {
  it("should return initial state", () => {
    const store = createStore<State>({ count: 0 });
    expect(store.get()).toEqual({ count: 0 });
  });

  it("should update the state", () => {
    const store = createStore<State>({ count: 0 });
    store.set({ count: 5 });
    expect(store.get()).toEqual({ count: 5 });
  });

  it("should notify subscribers on state change", () => {
    const store = createStore<State>({ count: 0 });
    const listener = vi.fn();
    store.subscribe(listener);
    store.set({ count: 1 });

    expect(listener).toHaveBeenCalledWith({ count: 1 }, { count: 0 });
  });

  it("should undo state changes", () => {
    const store = createStore<State>({ count: 0 });
    store.set({ count: 1 });
    store.set({ count: 2 });
    store.undo();
    expect(store.get()).toEqual({ count: 1 });
    store.undo();
    expect(store.get()).toEqual({ count: 0 });
  });

  it("should redo state changes", () => {
    const store = createStore<State>({ count: 0 });
    store.set({ count: 1 });
    store.set({ count: 2 });
    store.undo(); // back to 1
    store.redo(); // forward to 2
    expect(store.get()).toEqual({ count: 2 });
  });

  it("should return state snapshots", () => {
    const store = createStore<State>({ count: 0 });
    store.set({ count: 1 });
    store.set({ count: 2 });

    const snapshots = store.snapshot();
    expect(snapshots).toEqual([{ count: 0 }, { count: 1 }, { count: 2 }]);
  });
});
