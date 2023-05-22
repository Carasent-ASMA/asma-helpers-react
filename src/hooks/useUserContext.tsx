import type { IUserContext } from 'asma-types'
import { useEffect } from 'react'
import type { History } from 'history'
type IUseUserContext = {
    callback: (user_context: IUserContext) => void
    getUserContext: () => IUserContext
    history: History
}
export const useUserContext = ({ callback, history, getUserContext }: IUseUserContext) => {
    useEffect(() => {
        const unListenModuleHistory = history.listen(() => {
            callback(getUserContext())
        })

        return () => {
            unListenModuleHistory()
        }
    }, [])
}
