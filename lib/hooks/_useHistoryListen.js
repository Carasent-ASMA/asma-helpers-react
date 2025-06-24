import { useEffect } from 'react';
import {} from 'history';
/**
 * history is instantiated in asma-helpers and there is declared globally
 */
export const realWindow = window.rawWindow || window;
const gHistory = realWindow.__ASMA__SHELL__?.history;
export function _useHistoryListen({ callback, history, immediate_callback }) {
    useEffect(() => {
        history = gHistory || history;
        if (!history) {
            console.warn('history is not instantiated! This likely happened because effect was called before history was instantiated.');
            return;
        }
        immediate_callback && callback({ action: history.action, location: history.location });
        const unListenModuleHistory = history?.listen(callback);
        return () => {
            unListenModuleHistory?.();
        };
    }, []);
}
//# sourceMappingURL=_useHistoryListen.js.map