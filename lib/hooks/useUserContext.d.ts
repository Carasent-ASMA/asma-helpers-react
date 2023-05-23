import type { IUserContext } from 'asma-types';
type IUserContextStore = {
    user_context: IUserContext;
    onChangeUserContext: (user_context: IUserContext) => void;
};
export declare function useUserContext(store: IUserContextStore): void;
export {};
//# sourceMappingURL=useUserContext.d.ts.map