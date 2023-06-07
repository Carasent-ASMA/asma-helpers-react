import type { Update } from 'history';
import type { IUserContext } from 'asma-types';
type IUserContextStore = {
    user_context: IUserContext;
    onChangeUserContext: (user_context: IUserContext) => void;
};
type IUseUserContext = {
    store: IUserContextStore;
    sideEffect?: (update: Update) => void;
};
export declare function _useUserContext({ sideEffect, store }: IUseUserContext): void;
export {};
//# sourceMappingURL=useUserContext.d.ts.map