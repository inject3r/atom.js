import type { Middleware } from "../types";

export const loggerMiddleware =
  <T>(): Middleware<T> =>
  (set, get) => ({
    set: (val) => {
      console.log("%c[Logger] Before:", "color: gray", get());
      console.log("%c[Logger] Set:", "color: blue", val);
      set(val);
      console.log("%c[Logger] After:", "color: green", get());
    },
  });
