import { Middleware, Store } from '../types';
export declare function createStore<T extends object>(initial: T, middlewares?: Middleware<T>[]): Store<T>;
