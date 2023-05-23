import { useHistoryListen } from './useHistoryListen'
import type { IUserContext } from 'asma-types'
type IUserContextStore = {
    user_context: IUserContext
    onChangeUserContext: (user_context: IUserContext) => void
}
export function useUserContext(store: IUserContextStore) {
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
        },
    })
}
