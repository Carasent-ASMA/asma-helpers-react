import { useEffect, useState } from 'react';
/**
 * @important
 *      initFn.name must be unique please do not use anonymous functions or .create() from MST but rather wapp it in a new function with a unique name
 *
 * @var do_not_persist ?bool should not be persisted to indexedDB default false
 * @var unique_index ?string if you need to have multiple instances of the same store with different data
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
/* @__PURE__ */
export function useMst$Instance(initFn, initIDBListenersOnMstSn, { do_not_persist = false, unique_index }) {
    const [store] = useState(initFn);
    useEffect(() => {
        /**
         * //TODO in case if there are multiple instances with same initFn.name need to check how we can make them unique dynamically
         */
        if (do_not_persist)
            return;
        const { unregisterAll } = initIDBListenersOnMstSn({ [initFn.name + unique_index]: store });
        return () => {
            unregisterAll();
        };
    }, []);
    return store;
}
export default useMst$Instance;
//# sourceMappingURL=useMst$Instance.js.map