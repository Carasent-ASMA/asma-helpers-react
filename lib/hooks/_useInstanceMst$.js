import { useEffect, useState } from 'react';
/**
 * @important
 *      initFn.name must be unique please do not use anonymous functions or .create() from MST but rather wrap it in a new function with a unique name
 *
 * @var do_not_persist ?bool should not be persisted to indexedDB default false
 * @var unique_index required string if you need to have multiple instances of the same store with different data
 * @var initFn should return the MST store
 *
 * @example
 *
 *      function createAnonymousSchemaRoot$() {
 *          #optionally if you need to to have some predefined data in snapshot
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
const asma_debug = !!localStorage.getItem('asma-debug');
/**
 * @deprecated will be removed in next major version use _useInstanceMst$ instead
 */
export const useInstanceMst$ = _useInstanceMst$;
export function _useInstanceMst$(initFn, initIDBListenersOnMstSn, { unique_index, do_not_persist = false, inspectable = false, mobxDevtoolsMst, }) {
    const [store] = useState(initFn);
    useEffect(() => {
        /**
         *
         */
        if (inspectable || asma_debug) {
            setMobxDevTools(store, mobxDevtoolsMst);
        }
        if (do_not_persist)
            return;
        const { unregisterAll } = initIDBListenersOnMstSn({ [`${unique_index}${initFn.name}`]: store });
        return () => {
            unregisterAll();
        };
    }, []);
    return store;
}
async function setMobxDevTools(store, mobx_devTools_mst) {
    var _a;
    const makeInspectable = (_a = (await (mobx_devTools_mst === null || mobx_devTools_mst === void 0 ? void 0 : mobx_devTools_mst()))) === null || _a === void 0 ? void 0 : _a.default;
    if (!makeInspectable) {
        console.warn('mobx-devtools-mst is not installed');
        return;
    }
    makeInspectable(store);
}
export default _useInstanceMst$;
//# sourceMappingURL=_useInstanceMst$.js.map