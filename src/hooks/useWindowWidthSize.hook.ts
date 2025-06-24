import { useState, useEffect } from 'react'
import { realWindow } from './_useHistoryListen.js'
export function useWindowWidthSize(): number | undefined {
    const [windowWidthSize, setWindowWidthSize] = useState<number | undefined>(undefined)
    useEffect(() => {
        const handleResize = () => setWindowWidthSize(realWindow.innerWidth)
        realWindow.addEventListener('resize', handleResize)
        handleResize()
        // Remove event listener on cleanup
        return () => realWindow.removeEventListener('resize', handleResize)
    }, [realWindow.innerWidth])

    return windowWidthSize
}
