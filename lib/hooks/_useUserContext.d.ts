import type { Update, History } from 'history';
import type { IUserContext } from 'asma-types';
type IUserContextStore = {
    user_context: IUserContext;
    onChangeUserContext: (user_context: IUserContext) => void;
};
type IUseUserContext = {
    store: IUserContextStore;
    sideEffect?: (update: Update) => void;
    history?: History;
    immediate_callback?: boolean;
};
export declare function _useUserContext({ sideEffect, store, history, immediate_callback }: IUseUserContext): void;
export {};
//# sourceMappingURL=_useUserContext.d.ts.map