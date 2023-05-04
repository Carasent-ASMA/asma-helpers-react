import { useEffect } from 'react'

/* @__PURE__ */
export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}
