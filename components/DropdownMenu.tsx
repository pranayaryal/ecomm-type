import React from 'react'

export default function DropdownMenu({ children }) {
  return (
    <div className='relative'>
      <div
        style={{ transform: 'translate3d(0px, 3px, 0px)' }}
        className='block z-30 absolute top-0 left-0 bg-white float-left py-2 px-0 text-left border border-gray-300 rounded-sm mt-0.5 bg-clip-padding'
        role="menu"
        aria-orientation='vertical'
        aria-labelledby='options-menu'
      >
        {children}


      </div>
    </div>
  )
}
