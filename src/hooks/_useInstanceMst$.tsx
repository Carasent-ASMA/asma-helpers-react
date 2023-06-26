import { useEffect, useState } from 'react'
import { onSnapshot, type IStateTreeNode, type IDisposer } from 'mobx-state-tree'
import type MakeInspectable from 'mobx-devtools-mst'

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
const asma_debug = !!localStorage.getItem('asma-debug')

/**
 * @deprecated will be removed in next major version use _useInstanceMst$ instead
 */
export const useInstanceMst$ = _useInstanceMst$

export function _useInstanceMst$<
    T extends IStateTreeNode,
    IFDB extends (store: object) => { unregisterAll: () => void; idb_check_promise: Promise<void> },
>(
    initFn: () => T,
    initIDBListenersOnMstSn: IFDB,
    {
        unique_index,
        do_not_persist = false,
        inspectable = false,
        mobxDevtoolsMst,
        getOpenReplayObject,
    }: {
        unique_index: string
        do_not_persist?: boolean
        inspectable: boolean
        mobxDevtoolsMst: () => Promise<{ default: typeof MakeInspectable }>
        getOpenReplayObject: () => {
            mobxObserver:
                | ((ev: { type: string; name: string; object: any; debugObjectName: string }) => void)
                | undefined
        }
    },
) {
    const [store] = useState(initFn)

    useEffect(() => {
        /**
         *
         */

        if (inspectable || asma_debug) {
            setMobxDevTools(store, mobxDevtoolsMst)
        }

        let dispose: IDisposer | undefined

        const mobxObserver = getOpenReplayObject().mobxObserver

        if (mobxObserver) {
            dispose = onSnapshot(store, (snapshot) => {
                mobxObserver({
                    type: 'snapshot',
                    name: initFn.name,
                    object: snapshot,
                    debugObjectName: initFn.name,
                })
            })
        }

        if (do_not_persist) return

        const { unregisterAll } = initIDBListenersOnMstSn({ [`${unique_index}-${initFn.name}`]: store })

        return () => {
            unregisterAll()
            dispose?.()
        }
    }, [])
    return store
}

async function setMobxDevTools(
    store: IStateTreeNode,
    mobx_devTools_mst?: () => Promise<{ default: typeof MakeInspectable }>,
) {
    const makeInspectable = (await mobx_devTools_mst?.())?.default

    if (!makeInspectable) {
        console.warn('mobx-devtools-mst is not installed')

        return
    }
    makeInspectable(store)
}
export default _useInstanceMst$
