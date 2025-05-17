import type { Middleware } from "../types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

export const devtoolsMiddleware = <T>(name = "SuperState"): Middleware<T> => {
  let devtools: any;
  return (set, get) => {
    if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
      devtools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({ name });
      devtools.init(get());
    }
    return {
      set: (val) => {
        set(val);
        devtools?.send("SET_STATE", get());
      },
    };
  };
};
