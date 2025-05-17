import { Store } from '../types';
export declare function useStore<T, U>(store: Store<T>, selector: (s: T) => U, compare?: (a: U, b: U) => boolean): U;
