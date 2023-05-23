var _a;
import { useEffect } from 'react';
/**
 * history is instantiated in asma-helpers and there is declared globally
 */
const history = (_a = window.__ASMA__SHELL__) === null || _a === void 0 ? void 0 : _a.history;
export function useHistoryListen({ callback }) {
    useEffect(() => {
        if (!history) {
            console.warn('history is not instantiated! This likely happened because effect was called before history was instantiated.');
        }
        const unListenModuleHistory = history === null || history === void 0 ? void 0 : history.listen(callback);
        return () => {
            unListenModuleHistory === null || unListenModuleHistory === void 0 ? void 0 : unListenModuleHistory();
        };
    }, []);
}
//# sourceMappingURL=useHistoryListen.js.map