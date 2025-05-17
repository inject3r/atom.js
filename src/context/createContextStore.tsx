import { createContext, useContext, useRef, type ReactNode } from "react";
import { createStore } from "../core/createStore";
import { useStore } from "../hooks/useStore";
import type { Middleware, Store } from "../types";

export function createContextStore<T extends object>(
  initial: T,
  middlewares: Middleware<T>[] = []
) {
  const ctx = createContext<Store<T> | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<Store<T>>();
    if (!storeRef.current) {
      storeRef.current = createStore(initial, middlewares);
    }

    return <ctx.Provider value={storeRef.current}>{children}</ctx.Provider>;
  };

  function useScopedStore<U>(
    selector: (s: T) => U,
    compare?: (a: U, b: U) => boolean
  ): U {
    const store = useContext(ctx);
    if (!store) throw new Error("Store context missing");
    return useStore(store, selector, compare);
  }

  function getStore(): Store<T> {
    const store = useContext(ctx);
    if (!store) throw new Error("Store context missing");
    return store;
  }

  return { Provider, useScopedStore, getStore };
}
