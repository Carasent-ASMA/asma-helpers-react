import { history, subscribeToHistory } from 'asma-core-helpers';
import { useSyncExternalStore } from 'react';
let cachedHide = null;
let cachedHideRaw = null;
const getHideSnapshot = () => {
    const raw = new URLSearchParams(history.location.search).get('hide');
    if (raw === cachedHideRaw)
        return cachedHide; // same string > same reference
    cachedHideRaw = raw;
    cachedHide = raw ? raw.split(',') : null;
    return cachedHide;
};
export const useHideParam = () => {
    return useSyncExternalStore(subscribeToHistory, getHideSnapshot);
};
//# sourceMappingURL=useHideParam.js.map