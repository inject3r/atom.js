import type { Listener, Middleware, Store } from "../types";
import { shallowEqual } from "./shallowEqual";

export function createStore<T extends object>(
  initial: T,
  middlewares: Middleware<T>[] = []
): Store<T> {
  let state = { ...initial };
  let listeners: Listener<T>[] = [];
  const history: T[] = [state];
  let historyIndex = 0;

  const get = () => state;
  const baseSet = (val: Partial<T>) => {
    const prev = state;
    state = { ...state, ...val };
    if (!shallowEqual(prev, state)) {
      if (historyIndex < history.length - 1) {
        history.splice(historyIndex + 1);
      }
      history.push(state);
      historyIndex++;
    }
    listeners.forEach((fn) => fn(state, prev));
  };

  let set = baseSet;
  for (const mw of middlewares) {
    const result = mw(set, get);
    set = result.set;
  }

  const subscribe = (fn: Listener<T>) => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  };

  const snapshot = () => history.slice();
  const undo = () => {
    if (historyIndex > 0) {
      const prev = state;
      historyIndex--;
      state = history[historyIndex];
      listeners.forEach((fn) => fn(state, prev));
    }
  };
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const prev = state;
      historyIndex++;
      state = history[historyIndex];
      listeners.forEach((fn) => fn(state, prev));
    }
  };

  return { get, set, subscribe, snapshot, undo, redo };
}
