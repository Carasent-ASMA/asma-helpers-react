import { useState, useEffect } from 'react';
import { realWindow } from './_useHistoryListen';
export function useWindowWidthSize() {
    const [windowWidthSize, setWindowWidthSize] = useState(undefined);
    useEffect(() => {
        const handleResize = () => setWindowWidthSize(realWindow.innerWidth);
        realWindow.addEventListener('resize', handleResize);
        handleResize();
        // Remove event listener on cleanup
        return () => realWindow.removeEventListener('resize', handleResize);
    }, [realWindow.innerWidth]);
    return windowWidthSize;
}
//# sourceMappingURL=useWindowWidthSize.hook.js.map