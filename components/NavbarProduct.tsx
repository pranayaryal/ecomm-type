import { useState, useContext, useEffect } from 'react'
import Logo from './logo';
import DropdownPage from './DropdownPage';
// import { useShoppingCartLocal } from '@/context/ShoppingCartProviderLocal'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import ShoppingCartExperimental from './ShoppingCartExperimental';

import React from 'react'

const NavbarProduct = () => {
    const [openCartAside, setOpenAside] = useState(false);
    // const [ total, setTotal ] = useState(0)
    const {
        openWholeCart,
        closeWholeCart,
        products,
        getProduct,
        getProducts,
        cartItems
    } = useShoppingCart()
    
    const openCart = () => setOpenAside(true)
    const closeCart = () => setOpenAside(false)

    const total = cartItems ? cartItems.length : 0


    useEffect(() => {
        getProducts()

    }, [])


    return (
        <>
            <div className='hidden md:block mt-6 w-[100%] pl-8 pr-12 ml-auto mr-auto text-dark-slate-grey'>
                <div className='flex justify-between'>
                    {/* Left */}
                    <div className='flex justify-between items-center space-x-4 text-xs font-sans-fancy'>
                        <div className='p-[0.2px] border-b-1 border-transparent hover:border-b hover:border-dark-slate-grey'>Pricing</div>
                        <div className='p-[0.2px] border-b-1 border-transparent hover:border-b hover:border-dark-slate-grey'>Company</div>
                        <div className='p-[0.2px] border-b-1 transition duration-100 ease-in-out border-transparent hover:border-b hover:border-dark-slate-grey'>Learn more</div>
                        <button onClick={() => getProduct(3)}
                            className='p-[0.2px] border-b-1 transition duration-100 ease-in-out border-transparent hover:border-b hover:border-dark-slate-grey'>
                            Get Product
                        </button>
                    </div>
                    <Logo width="255" height="30" />
                    {/* Right */}
                    <div
                      onMouseOver={openCart}
                      onMouseOut={closeCart}
                        >
                        <div className='flex space-x-2 items-center cursor-pointer'
                            onMouseOver={openWholeCart}
                            onMouseOut={closeWholeCart}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                            <p className='font-sans-fancy text-xs hover:underline'>{`Shopping bag(${total})`}</p>

                        </div>
                        <ShoppingCartExperimental
                            isOpen={openCartAside}
                            cartItems={cartItems}
                            products={products}
                            />

                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className='block md:hidden mt-8 ml-auto mr-auto px-2 py-4 w-[90%] text-dark-slate-grey'>
                <div className='flex justify-between'>
                    {/* Left */}
                    <Logo width="180" height="35" />
                </div>
            </div>
        </>
    )
}

export default NavbarProduct;