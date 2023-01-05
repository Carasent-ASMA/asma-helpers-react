import type React from 'react';
export declare function createInjectableContext<T>(): {
    StoreProvider: React.FC<{
        store: T;
        children: React.ReactNode;
    }>;
    useStore: () => T;
};
//# sourceMappingURL=CreateInjectableContext.d.ts.map