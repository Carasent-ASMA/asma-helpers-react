import type React from 'react'
import { createContext, FC, useContext } from 'react'
/* @__PURE__ */
export function createInjectableContext<T>() {
    const storeContext = createContext<T | null>(null)

    const StoreProvider: FC<{ store: T; children: React.ReactNode }> = ({ children, store }) => {
        return <storeContext.Provider value={store}>{children}</storeContext.Provider>
    }

    /* const StoreProvider: FC = ({ children }) => (
        <CreateStoreProvider root_store={root_store}>{children}</CreateStoreProvider>
    ) */
    const useStore = (): T => {
        const store = useContext(storeContext)
        if (!store) {
            throw new Error('useStore shall be used within StoreProvider')
        }

        return store
    }

    return {
        StoreProvider,
        useStore,
    }
}
