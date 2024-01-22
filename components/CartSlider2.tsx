import React from 'react'
import { useEffect, useRef, useState } from 'react'

export const CartSlider: React.FC = () => {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen((prevState) => !prevState)
    }

    return (
        <>
            <button
                type="button"
                aria-disabled={open}
                disabled={open}
                onClick={toggle}
                className='text-white cursor-pointer focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-gray-800'
            >
                Open Cart
            </button>
            <SideNav open={open} setOpen={setOpen}>
                <p>See here</p>
            </SideNav>
        </>
    )

}

export const SideNav: React.FC<{
    open: boolean,
    setOpen: (val: boolean) => void,
    children: React.ReactNode
}> = ({ open, setOpen, children }) => {
    const asideRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: Event) => {
            if (!asideRef.current?.contains(event.target as Node)) {
                if (!open) return
                setOpen(false)
            }
        };
        window.addEventListener('mousedown', ((event: Event) => handleOutsideClick(event)))
        return () => window.removeEventListener('mousedown', ((event: Event) => handleOutsideClick(event)))

    }, [open, asideRef])

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (!open) return;

        if (event.key === 'Escape') {
           setOpen(false)
        }
      };
      document.addEventListener('keyup', ((event: KeyboardEvent) => handleEscape(event)))
      return () => document.removeEventListener('keyup', ((event: KeyboardEvent) => handleEscape(event)))
    }, [open])



    return (
        <aside
          ref={asideRef}
          className={`h-screen fixed z-20 top-0 right-0 transition-all ease duration-200 ${open ? 'w-7/12 md:w-60 bg-gray-800 text-white overflow-hidden': 'w-0 bg-gray-800 text-white overflow-x-hidden'}`}
          >
            <button aria-label='Close' className='absolute top-1 focus:outline-none right-3 text-3xl text-white cursor-pointer'>
                &times;
            </button>

        </aside>
        

    );

}