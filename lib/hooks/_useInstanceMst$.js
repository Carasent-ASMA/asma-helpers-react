import { useEffect, useState } from 'react';
import { onSnapshot, isStateTreeNode, applySnapshot } from 'mobx-state-tree';
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
const asma_debug = !!localStorage.getItem('asma-debug');
/**
 * @deprecated will be removed in next major version use _useInstanceMst$ instead
 */
export const useInstanceMst$ = _useInstanceMst$;
export function _useInstanceMst$(initFn, initIDBListenersOnMstSn, { unique_index, do_not_persist = false, inspectable = false, storage = 'indexedDB', mobxDevtoolsMst, getOpenReplayObject, persist_keys, }) {
    const [store] = useState(initFn);
    useEffect(() => {
        /**
         *
         */
        if (inspectable || asma_debug) {
            setMobxDevTools(store, mobxDevtoolsMst);
        }
        let dispose;
        const mobxObserver = getOpenReplayObject().mobxObserver;
        if (mobxObserver) {
            dispose = onSnapshot(store, (snapshot) => {
                mobxObserver({
                    type: 'snapshot',
                    name: initFn.name,
                    object: snapshot,
                    debugObjectName: initFn.name,
                });
            });
        }
        if (do_not_persist)
            return;
        const unregister = initPersist({
            initIDBListenersOnMstSn,
            storage,
            initFn_name: initFn.name,
            unique_index,
            persist_keys,
            store,
        });
        return () => {
            unregister.forEach((fn) => fn());
            dispose === null || dispose === void 0 ? void 0 : dispose();
        };
    }, []);
    return store;
}
function initPersist(props) {
    const { store, persist_keys, storage, initFn_name, unique_index } = props;
    const unregister = [];
    const onSnapshotCall = (store, key) => {
        const key_name = key ? `${unique_index}-${initFn_name}-${key}` : `${unique_index}-${initFn_name}`;
        if (props.storage === 'localStorage') {
            const unReg = onSnapshot(store, () => {
                localStorage.setItem(key_name, JSON.stringify(store));
            });
            unregister.push(unReg);
            const lsItem = localStorage.getItem(key_name);
            if (lsItem) {
                try {
                    const parsed = JSON.parse(lsItem);
                    if (parsed) {
                        applySnapshot(store, parsed);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
        else if (props.storage === 'indexedDB') {
            const { unregisterAll } = props.initIDBListenersOnMstSn({
                [key_name]: store,
            });
            unregister.push(unregisterAll);
        }
    };
    if (!persist_keys) {
        if (storage === 'localStorage') {
            onSnapshotCall(store);
        }
        else {
        }
    }
    else {
        persist_keys.forEach((key) => {
            const subStore = store[key];
            if (isStateTreeNode(subStore) && typeof key === 'string') {
                if (storage === 'localStorage') {
                    onSnapshotCall(subStore, key);
                }
            }
        });
    }
    return unregister;
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