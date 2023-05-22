import { useEffect } from 'react';
export const useUserContext = ({ callback, history, getUserContext }) => {
    useEffect(() => {
        const unListenModuleHistory = history.listen(() => {
            callback(getUserContext());
        });
        return () => {
            unListenModuleHistory();
        };
    }, []);
};
//# sourceMappingURL=useUserContext.js.map