import { history } from 'asma-core-helpers/lib';
import { useSyncExternalStore } from 'react';
let cachedHide = null;
let cachedHideRaw = null;
const subscribeToHistory = (listener) => history.listen(listener);
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