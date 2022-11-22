import { useState, useEffect } from 'react'
export function useWindowWidthSize(): number | undefined {
    const [windowWidthSize, setWindowWidthSize] = useState<number | undefined>(undefined)
    useEffect(() => {
        const handleResize = () => setWindowWidthSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [window.innerWidth])

    return windowWidthSize
}
