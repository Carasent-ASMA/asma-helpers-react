import { _useHistoryListen } from './_useHistoryListen.js';
export function _useUserContext({ sideEffect, store, history, immediate_callback }) {
    _useHistoryListen({
        callback: (listener) => {
            const new_user_context = new URLSearchParams(listener.location.search).get('user_context');
            if (new_user_context &&
                new_user_context in ['ME', 'RECIPIENT'] &&
                store.user_context !== new_user_context) {
                store.onChangeUserContext(new_user_context);
            }
            sideEffect?.(listener);
        },
        immediate_callback,
        history,
    });
}
//# sourceMappingURL=_useUserContext.js.map