import type { Middleware } from "../types";

export const asyncMiddleware =
  <T extends { isLoading?: boolean; error?: string | null }>(): Middleware<T> =>
  (set, get) => ({
    set: (val) => {
      const keys = Object.keys(val);
      for (const key of keys) {
        const v = (val as any)[key];
        if (v instanceof Promise) {
          set({ isLoading: true, error: null } as Partial<T>);
          v.then((res: any) => {
            set({ ...res, isLoading: false } as Partial<T>);
          }).catch((err: any) => {
            set({
              error: err?.message || "Error",
              isLoading: false,
            } as Partial<T>);
          });
          return;
        }
      }
      set(val);
    },
  });
