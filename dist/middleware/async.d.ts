import { Middleware } from '../types';
export declare const asyncMiddleware: <T extends {
    isLoading?: boolean;
    error?: string | null;
}>() => Middleware<T>;
