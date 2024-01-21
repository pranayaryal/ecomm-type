import { useState, useCallback, useEffect, useRef } from 'react'
import DropdownItem from './DropdownItem'
import Tooltip from './tooltip'
import DownArrow from './DownArrow';

export default function DropdownPage() {
  function useToggle() {

    const [show, setShow] = useState(false);
    const ref = useRef()

    const toggle = useCallback(() => {
      setShow((prevState) => !prevState);
    }, []);

    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (show && !ref.current?.contains(e.target)) {
          if (!show) return;
          setShow(false);
        }
      };
      document.addEventListener('click', handleOutsideClick)
      return () => document.removeEventListener('click', handleOutsideClick)
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
    };


  }

  const { show, toggle, ref } = useToggle()
  return (
    <div>
      <button className='focus:outline-none'
        onClick={toggle}
        type='button'
        id='options-menu'
        ref={ref}
      >

        <span className='flex bg-indigo-900 text-white rounded px-6 py-2 font-medium'>
          Options
          <DownArrow />

        </span>
      </button>
      {show && <div className='relative'>
        <div
          style={{ transform: 'translate3d(0px, 3px, 0px)' }}
          className='bg-transparent absolute block pt-2 w-full'
        >
          <Tooltip />
          <div className='block text-md text-gray-50 font-extralight text-left relative overflow-hidden object-scale-down bg-white min-w-[14rem] shadow-2xl shadow-gray-200 box-border rounded-xl'>
            <DropdownItem>Enoch Ndika</DropdownItem>
            <DropdownItem>Josue Kazenga</DropdownItem>
            <DropdownItem>Business</DropdownItem>
          </div>


        </div>
      </div>}

    </div>
  )
}
