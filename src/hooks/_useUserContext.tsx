import type { Update, History } from 'history'
import { _useHistoryListen } from './_useHistoryListen'
import type { IUserContext } from 'asma-types'
type IUserContextStore = {
    user_context: IUserContext
    onChangeUserContext: (user_context: IUserContext) => void
}
type IUseUserContext = {
    store: IUserContextStore
    sideEffect?: (update: Update) => void
    history?: History
    immediate_callback?: boolean
}
export function _useUserContext({ sideEffect, store, history, immediate_callback }: IUseUserContext) {
    _useHistoryListen({
        callback: (listener) => {
            const new_user_context = new URLSearchParams(listener.location.search).get('user_context')
            if (
                new_user_context &&
                new_user_context in (['ME', 'RECIPIENT'] as IUserContext[]) &&
                store.user_context !== new_user_context
            ) {
                store.onChangeUserContext(new_user_context as IUserContext)
            }
            sideEffect?.(listener)
        },
        immediate_callback,
        history,
    })
}
