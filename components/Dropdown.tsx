import { useState, useEffect, useRef, useCallback } from 'react'

export default function Dropdown({ children }) {
    const useToggle = () => {
        const [show, setShow] = useState(false);
        const ref = useRef(null)

        const toggle = useCallback(() => {
            setShow((prevState) => !prevState)
        }, [])

        useEffect(() => {
            const handleOutsideClick = (event) => {
                if (!ref.current?.contains(event.target)){
                    if (!show) return;
                    setShow(false)
                }
            };
            window.addEventListener('click', handleOutsideClick)
            return () => window.removeEventListener('click', handleOutsideClick)
        }, [show, ref])

        useEffect(() => {
            const handleEscape = (event) => {
                if (!show) return;

                if (event.key === 'Escape') {
                    setShow(false)
                }
            };
            document.addEventListener('keyup', handleEscape)
            return () => document.removeEventListener('keyup', handleEscape)
        }, [show])

        return {
            show,
            toggle,
            ref
        }


    }
    const { show, toggle } = useToggle();

    const dropdownToggle = children[0];
    const dropdownMenu = children[1];
    return (
        <>
            <button
                className='focus:outline-none'
                onClick={toggle}
                type='button'
                id="options-menu"
                aria-expanded='true'
                aria-haspopup='true'
            >
                {dropdownToggle}
            </button>
            {show && <>{dropdownMenu}</>}

        </>
    )
}
