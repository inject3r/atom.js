export type Listener<T> = (state: T, prev: T) => void;
export type Unsubscribe = () => void;
export type Middleware<T> = (
  set: (val: Partial<T>) => void,
  get: () => T
) => { set: (val: Partial<T>) => void };

export type Store<T> = {
  get: () => T;
  set: (val: Partial<T>) => void;
  subscribe: (fn: Listener<T>) => Unsubscribe;
  snapshot: () => T[];
  undo: () => void;
  redo: () => void;
};
