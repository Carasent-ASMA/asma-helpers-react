import type { Update } from 'history'
import { useHistoryListen } from './useHistoryListen'
import type { IUserContext } from 'asma-types'
type IUserContextStore = {
    user_context: IUserContext
    onChangeUserContext: (user_context: IUserContext) => void
}
type IUseUserContext = {
    store: IUserContextStore
    sideEffect?: (update: Update) => void
}
export function useUserContext({ sideEffect, store }: IUseUserContext) {
    useHistoryListen({
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
    })
}
