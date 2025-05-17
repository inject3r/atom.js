import { useSyncExternalStore } from "react";
import { shallowEqual } from "../core/shallowEqual";
import type { Store } from "../types";

export function useStore<T, U>(
  store: Store<T>,
  selector: (s: T) => U,
  compare: (a: U, b: U) => boolean = shallowEqual
): U {
  const snap = () => selector(store.get());
  return useSyncExternalStore(store.subscribe, snap, snap);
}
