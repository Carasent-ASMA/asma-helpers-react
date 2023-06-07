import type { IStateTreeNode } from 'mobx-state-tree';
import type MakeInspectable from 'mobx-devtools-mst';
/**
 * @deprecated will be removed in next major version use _useInstanceMst$ instead
 */
export declare const useInstanceMst$: typeof _useInstanceMst$;
export declare function _useInstanceMst$<T extends IStateTreeNode, IFDB extends (store: object) => {
    unregisterAll: () => void;
    idb_check_promise: Promise<void>;
}>(initFn: () => T, initIDBListenersOnMstSn: IFDB, { unique_index, do_not_persist, inspectable, mobxDevtoolsMst, }: {
    unique_index: string;
    do_not_persist?: boolean;
    inspectable: boolean;
    mobxDevtoolsMst: () => Promise<{
        default: typeof MakeInspectable;
    }>;
}): T;
export default _useInstanceMst$;
//# sourceMappingURL=_useInstanceMst$.d.ts.map