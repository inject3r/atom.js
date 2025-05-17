import { Middleware } from '../types';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: any;
    }
}
export declare const devtoolsMiddleware: <T>(name?: string) => Middleware<T>;
