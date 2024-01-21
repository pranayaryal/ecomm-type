import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
import CartProvider from '@/context/CartProvider'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <div className='bg-white-smoke flex flex-col'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>

    </CartProvider>
  )
}

export default Layout;