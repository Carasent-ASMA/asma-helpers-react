import type { IStateTreeNode } from 'mobx-state-tree';
/**
 * @important
 *      initFn.name must be unique please do not use anonymous functions or .create() from MST but rather wapp it in a new function with a unique name
 *
 * @var persist ?bool should be persisted to indexedDB default true
 * @var unique_name ?string if you need to have multiple instances of the same store with different data
 * @var initFn should return the MST store
 *
 * @example
 *
 *      function createAnonymousSchemaRoot$() {
 *          //optionally if you need to to have some predifined data in snapshot
 *          const optionalSnapshot = {...}
 *
 *          const store = AnonymousSchemaRoot$.create(optionalSnapshot)
 *          //write your logic for creating the store here
 *
 *          //optional applySnapshot if you want to do an async request and then apply to the snapshot
 *          fetchDataFromSomewhere()
 *              .then((data) => { applySnapshot(store, data)})
 *              .catch((err) => {
 *                  //do something logic here to reset data etc
 *                  console.error(err)
 *              })
 *
 *          return store
 *      }
 *
 *      const AnonymousSchemaIndex: React.FC = () => {
 *          const anonymous_schema$ = useInitMst$(createAnonymousSchemaRoot$)
 *      ...
 *      }
 */
export declare function useMst$Instance<T extends IStateTreeNode, IFDB extends (store: object) => {
    unregisterAll: () => void;
    idb_check_promise: Promise<void>;
}>(initFn: () => T, initIDBListenersOnMstSn: IFDB, { persist, unique_name }: {
    persist?: boolean;
    unique_name?: string;
}): T;
export default useMst$Instance;
//# sourceMappingURL=useMst$Instance.d.ts.map