import { useState, useCallback, useEffect, useRef } from 'react'
import DropdownItem from './DropdownItem'
import Tooltip from './tooltip'
import DownArrow from './DownArrow';

const DropdownPage: React.FC = () => {
  function useToggle() {

    const [show, setShow] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null)

    const toggle = useCallback(() => {
      setShow((prevState) => !prevState);
    }, []);

    useEffect(() => {
      const handleOutsideClick = (event: Event) => {
        if (show && !toggleRef.current?.contains(event.target as Node)) {
          if (!show) return;
          setShow(false);
        }
      };
      document.addEventListener('click', ((event: Event) => handleOutsideClick(event)))
      return () => document.removeEventListener('click', ((event: Event) => handleOutsideClick(event)))
    }, [show, toggleRef])

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (!show) return;

        if (event.key === 'Escape') {
          setShow(false)
        }
      };
      document.addEventListener('keyup', ((event: KeyboardEvent) => handleEscape(event)))
      return () => document.removeEventListener('keyup', ((event: KeyboardEvent) => handleEscape(event)))
    }, [show])

    return {
      show,
      toggle,
      toggleRef
    };


  }

  const { show, toggle, toggleRef } = useToggle()
  return (
    <div>
      <button className='focus:outline-none'
        onClick={toggle}
        type='button'
        id='options-menu'
        ref={toggleRef}
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

export default DropdownPage;