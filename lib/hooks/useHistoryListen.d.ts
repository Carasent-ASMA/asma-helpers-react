import { type History, type Listener } from 'history';
declare global {
    interface Window {
        __ASMA__SHELL__?: {
            history?: History;
        };
    }
}
type IUseUserContext = {
    callback: Listener;
    history?: History;
    immediate_callback?: boolean;
};
export declare function useHistoryListen({ callback, history, immediate_callback }: IUseUserContext): void;
export {};
//# sourceMappingURL=useHistoryListen.d.ts.map