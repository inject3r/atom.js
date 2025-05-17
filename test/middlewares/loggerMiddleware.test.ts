import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { loggerMiddleware } from "../../src";

type State = { count: number };

describe("loggerMiddleware", () => {
  let originalConsole: typeof console.log;

  beforeEach(() => {
    originalConsole = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = originalConsole;
  });

  it("should log before, set and after values", () => {
    let state: State = { count: 0 };
    const get = () => state;
    const set = (val: Partial<State>) => {
      state = { ...state, ...val };
    };

    const logger = loggerMiddleware<State>()(set, get);
    logger.set({ count: 5 });

    expect(console.log).toHaveBeenCalledWith(
      "%c[Logger] Before:",
      "color: gray",
      { count: 0 }
    );
    expect(console.log).toHaveBeenCalledWith("%c[Logger] Set:", "color: blue", {
      count: 5,
    });
    expect(console.log).toHaveBeenCalledWith(
      "%c[Logger] After:",
      "color: green",
      { count: 5 }
    );
    expect(state).toEqual({ count: 5 });
  });
});
