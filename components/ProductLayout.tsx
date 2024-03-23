import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
import NavbarProduct from './NavbarProduct'
// import { ShoppingCartProvider } from '@/context/ShoppingCartProvider'

const ProductLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='bg-white-smoke font-sans-fancy'>
      <NavbarProduct />
      <main
        className='ml-auto mr-auto md:w-[100%] md:mt-16 pl-8 pr-12 text-dark-slate-grey'>
        {children}
      </main>
      <Footer />
    </div>

  )
}

export default ProductLayout;