import { type History, type Listener } from 'history';
declare global {
    interface Window {
        __ASMA__SHELL__?: {
            history?: History;
        };
        rawWindow?: typeof window;
    }
}
/**
 * history is instantiated in asma-helpers and there is declared globally
 */
export declare const realWindow: Window & typeof globalThis;
type IUseUserContext = {
    callback: Listener;
    history?: History;
    immediate_callback?: boolean;
};
export declare function _useHistoryListen({ callback, history, immediate_callback }: IUseUserContext): void;
export {};
//# sourceMappingURL=_useHistoryListen.d.ts.map