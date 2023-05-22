import type { IUserContext } from 'asma-types';
import type { History } from 'history';
type IUseUserContext = {
    callback: (user_context: IUserContext) => void;
    getUserContext: () => IUserContext;
    history: History;
};
export declare const useUserContext: ({ callback, history, getUserContext }: IUseUserContext) => void;
export {};
//# sourceMappingURL=useUserContext.d.ts.map