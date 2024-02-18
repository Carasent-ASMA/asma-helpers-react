import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
export function createInjectableContext() {
    const storeContext = createContext(null);
    const StoreProvider = ({ children, store }) => {
        return _jsx(storeContext.Provider, { value: store, children: children });
    };
    /* const StoreProvider: FC = ({ children }) => (
        <CreateStoreProvider root_store={root_store}>{children}</CreateStoreProvider>
    ) */
    const useStore = () => {
        const store = useContext(storeContext);
        if (!store) {
            throw new Error('useStore shall be used within StoreProvider');
        }
        return store;
    };
    return {
        StoreProvider,
        useStore,
    };
}
//# sourceMappingURL=CreateInjectableContext.js.map