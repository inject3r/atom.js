import { ReactNode } from 'react';
import { Middleware, Store } from '../types';
export declare function createContextStore<T extends object>(initial: T, middlewares?: Middleware<T>[]): {
    Provider: ({ children }: {
        children: ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
    useScopedStore: <U>(selector: (s: T) => U, compare?: (a: U, b: U) => boolean) => U;
    getStore: () => Store<T>;
};
