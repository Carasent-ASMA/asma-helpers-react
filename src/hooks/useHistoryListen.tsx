import { useEffect } from 'react'
import type { History, Listener } from 'history'
declare global {
    interface Window {
        __ASMA__SHELL__?: {
            history?: History
        }
    }
}
/**
 * history is instantiated in asma-helpers and there is declared globally
 */
const history = window.__ASMA__SHELL__?.history

type IUseUserContext = {
    callback: Listener
}

export function useHistoryListen({ callback }: IUseUserContext) {
    useEffect(() => {
        if (!history) {
            console.warn(
                'history is not instantiated! This likely happened because effect was called before history was instantiated.',
            )
        }
        const unListenModuleHistory = history?.listen(callback)

        return () => {
            unListenModuleHistory?.()
        }
    }, [])
}
