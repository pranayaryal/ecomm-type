import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
// import { ShoppingCartProvider } from '@/context/ShoppingCartProvider'

const CheckoutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='bg-white-smoke flex flex-col font-sans relative'>
      <main
        className='w-[80%] ml-auto mr-auto md:w-[100%] md:mt-24 max-w-[1500px] pr-0 md:pl-[50px] text-dark-slate-grey'>
        {children}
      </main>
    </div>

  )
}

export default CheckoutLayout;