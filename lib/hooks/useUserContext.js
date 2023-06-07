import { useHistoryListen } from './useHistoryListen';
export function _useUserContext({ sideEffect, store }) {
    useHistoryListen({
        callback: (listener) => {
            const new_user_context = new URLSearchParams(listener.location.search).get('user_context');
            if (new_user_context &&
                new_user_context in ['ME', 'RECIPIENT'] &&
                store.user_context !== new_user_context) {
                store.onChangeUserContext(new_user_context);
            }
            sideEffect === null || sideEffect === void 0 ? void 0 : sideEffect(listener);
        },
    });
}
//# sourceMappingURL=useUserContext.js.map