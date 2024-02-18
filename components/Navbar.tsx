import { useState, useContext, useEffect } from 'react'
import Logo from './logo';
import DropdownPage from './DropdownPage';
import { useAuth } from '@/hooks/auth';
import { useShoppingCart } from '@/context/ShoppingCartProvider' 

import React from 'react'

const Navbar = () => {
    const { cartItems, getAllCartItems, forgetCart } = useShoppingCart()
    // const total = Object.values(cartItems).reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   0,
    // );
    const total = Object.values(cartItems).map(val => val.quantity).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    )

    console.log('total', total)
  
    // const [cartFromContext, setCartFromContext] = useState(cartItems)
    const [errors, setErrors] = useState<string[]>([])


    // useEffect(() => {
    //     getAllCartItems()
    //     console.log('cartItemsFromNavbar', cartItems)

    // }, [])

    const calcTotal = () => {
        const vals = Object.values(cartItems).reduce((a, b) => a + b, 0);



    }

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [openCartSlider, setOpenCartSlider] = useState(false)
    const toggleCartSlider = () => {
        setOpenCartSlider((prevState) => !prevState)
    }
    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <>
            <div className='hidden md:block mt-8 w-[100%] max-w-[1500px] pr-0 ml-auto mr-auto pl-[50px] text-dark-slate-grey'>
                <div className='flex justify-between'>
                    {errors?.length && errors.map((err, ix) => <p key={ix}>{err}</p>)}
                    {/* Left */}
                    <Logo width="255" height="30" />
                    <div className='flex justify-between items-center space-x-8'>
                        <DropdownPage />
                        {/* <DropdownAll /> */}
                        <div className='p-[0.2px] border-b-1 border-transparent hover:border-b hover:border-dark-slate-grey'>Pricing</div>
                        <div className='p-[0.2px] border-b-1 border-transparent hover:border-b hover:border-dark-slate-grey'>Company</div>
                        <div className='p-[0.2px] border-b-1 transition duration-100 ease-in-out border-transparent hover:border-b hover:border-dark-slate-grey'>Learn more</div>
                        <button onClick={forgetCart}
                            className='p-[0.2px] border-b-1 transition duration-100 ease-in-out border-transparent hover:border-b hover:border-dark-slate-grey'>Forget cart</button>
                    </div>
                    {/* Right */}
                    <div className='flex space-x-2 items-center'>
                        <input type="text" className='px-4 py-2 bg-pink-50 outline-none rounded-full' placeholder='Search' />
                        <button
                            className='relative outline-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                            <div
                                className='absolute bottom-0 right-0 text-xs-0 p-[2px] w-[1rem] h-[1rem] rounded-full bg-pink-100 text-black text-xs flex items-center justify-center cursor-pointer'>
                            </div>
                              <div>

                              </div>
                             
                              { total === 0 ? <span>{''}</span>: 
                              <span className='text-xs'>{total}</span> }

                        </button>

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

export default Navbar;