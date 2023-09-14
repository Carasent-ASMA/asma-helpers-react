import { type IStateTreeNode } from 'mobx-state-tree';
import type MakeInspectable from 'mobx-devtools-mst';
/**
 * @deprecated will be removed in next major version use _useInstanceMst$ instead
 */
export declare const useInstanceMst$: typeof _useInstanceMst$;
type IFDBFn = (store: object) => {
    unregisterAll: () => void;
    idb_check_promise: Promise<void>;
};
export declare function _useInstanceMst$<T extends IStateTreeNode, IFDB extends IFDBFn>(initFn: () => T, initIDBListenersOnMstSn: IFDB, { unique_index, do_not_persist, inspectable, storage, mobxDevtoolsMst, getOpenReplayObject, persist_keys, }: {
    persist_keys?: (keyof T)[];
    storage?: 'localStorage' | 'indexedDB';
    unique_index: string;
    do_not_persist?: boolean;
    inspectable: boolean;
    mobxDevtoolsMst: () => Promise<{
        default: typeof MakeInspectable;
    }>;
    getOpenReplayObject: () => {
        mobxObserver: ((ev: {
            type: string;
            name: string;
            object: any;
            debugObjectName: string;
        }) => void) | undefined;
    };
}): T;
export default _useInstanceMst$;
//# sourceMappingURL=_useInstanceMst$.d.ts.map