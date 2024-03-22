import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
// import { ShoppingCartProvider } from '@/context/ShoppingCartProvider'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='bg-white-smoke font-sans'>
      <Navbar />
      <main
        className='ml-auto mr-auto md:w-[100%] md:mt-16 max-w-[1500px] pr-0 md:pl-[50px] text-dark-slate-grey'>
        {children}
      </main>
      <Footer />
    </div>

  )
}

export default Layout;