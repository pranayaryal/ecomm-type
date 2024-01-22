import React from 'react'
import Arrow from './Arrow'
import { useState } from 'react'

const DropdownItem:React.FC<{children: React.ReactNode}> = ({ children }) =>  {
  const [ hovered, setHovered ] = useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='flex items-center hover:bg-yellow-custom px-6 font-extralight py-4 space-x-3 text-dark-slate-grey z-10 no-underline'>
      <div>{children}</div>
      {hovered && <Arrow />}
    </a>
  )
}

export default DropdownItem;
