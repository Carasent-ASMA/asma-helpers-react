import type { History, Listener } from 'history';
declare global {
    interface Window {
        __ASMA__SHELL__?: {
            history?: History;
        };
    }
}
type IUseUserContext = {
    callback: Listener;
};
export declare function useHistoryListen({ callback }: IUseUserContext): void;
export {};
//# sourceMappingURL=useHistoryListen.d.ts.map