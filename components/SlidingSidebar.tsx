import { motion, useCycle } from 'framer-motion'
import React from 'react'

const SlidingSideBar = () => {
  const [ isOpen, toggleOpen ] = useCycle(false, true)

  const sideBarVariants = {
    open: { x: 0}, 
    closed: { x: '-100%' }
  }


  return (
    <div className='relative'>
      <motion.div
       className='fixed top-0 left-0 h-screen bg-gray-800  text-white p-6'
       variants={sideBarVariants}
       animate={isOpen ? 'open' : 'closed'}
       transition={{ type: 'tween' }}
      >
        <button onClick={toggleOpen}>Close</button>

      </motion.div>
      <div className='ml-64'>
        <button onClick={toggleOpen}>Open SideBar</button>

      </div>

    </div>

  )

}

export default SlidingSideBar;


