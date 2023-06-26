import { type IStateTreeNode, type IModelType } from 'mobx-state-tree';
import type MakeInspectable from 'mobx-devtools-mst';
/**
 * @deprecated will be removed in next major version use _useInstanceMst$ instead
 */
export declare const useInstanceMst$: typeof _useInstanceMst$;
export declare function _useInstanceMst$<T extends IStateTreeNode, M extends Pick<IModelType<any, any>, 'name'>, IFDB extends (store: object) => {
    unregisterAll: () => void;
    idb_check_promise: Promise<void>;
}>(init_tuple: [initFn: () => T, mstModel: M], initIDBListenersOnMstSn: IFDB, { unique_index, do_not_persist, inspectable, mobxDevtoolsMst, openreplayMobxObserver, }: {
    unique_index: string;
    do_not_persist?: boolean;
    inspectable: boolean;
    mobxDevtoolsMst: () => Promise<{
        default: typeof MakeInspectable;
    }>;
    openreplayMobxObserver: ((ev: {
        type: string;
        name: string;
        object: any;
        debugObjectName: string;
    }) => void) | undefined;
}): T;
export default _useInstanceMst$;
//# sourceMappingURL=_useInstanceMst$.d.ts.map