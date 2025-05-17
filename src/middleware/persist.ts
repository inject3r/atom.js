import type { Middleware } from "../types";

export const persistMiddleware =
  <T>(key: string): Middleware<T> =>
  (set, get) => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(key);
        if (raw) set(JSON.parse(raw));
      } catch {}

      window.addEventListener("storage", (e) => {
        if (e.key === key && e.newValue) {
          try {
            set(JSON.parse(e.newValue));
          } catch {}
        }
      });
    }

    return {
      set: (val) => {
        const next = { ...get(), ...val };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(key, JSON.stringify(next));
          } catch {}
        }
        set(val);
      },
    };
  };
