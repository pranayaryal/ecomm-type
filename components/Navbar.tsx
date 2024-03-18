import { useState, useContext, useEffect } from 'react'
import Logo from './logo';
import DropdownPage from './DropdownPage';
// import { useShoppingCartLocal } from '@/context/ShoppingCartProviderLocal'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import ShoppingCartExperimental from './ShoppingCartExperimental';

import React from 'react'

const Navbar = () => {
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


    const setCookie = async () => {
        const resp = await fetch('/api/set-cookie', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: { apple: 1, orange: 3 }
            })

        })

        const resJson = await resp.json()
        console.log(resJson.cart)
    }

    const callUsps = async () => {
        const resp = await fetch('/api/usps', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const respJson = await resp.json()

    }

    const getCookie = async () => {
        const resp = await fetch('/api/get-cookie', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const resJson = await resp.json()
        console.log(resJson)
    }


    const total = cartItems ? cartItems.length : 0


    // const [cartFromContext, setCartFromContext] = useState(cartItems)
    const [errors, setErrors] = useState<string[]>([])


    // useEffect(() => {
    //     const jsonValue = window.localStorage.getItem('shopping-cart') || []
    //     setCartItems(jsonValue ? JSON.parse(jsonValue) : [])

    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
    // }, [cartItems])

    // useEffect(() => {
    //     setTotal(cartItems ? cartItems.length: 0)
    // }, [cartItems])

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

    useEffect(() => {
        getProducts()

    }, [])


    return (
        <>
            <div className='hidden md:block mt-8 w-[100%] max-w-[1500px] pr-0 ml-auto mr-auto pl-[50px] text-dark-slate-grey'>
                <div className='flex justify-between'>
                    {/* Left */}
                    <Logo width="255" height="30" />
                    <div className='flex justify-between items-center space-x-8'>
                        <DropdownPage />
                        {/* <DropdownAll /> */}
                        <div className='p-[0.2px] border-b-1 border-transparent hover:border-b hover:border-dark-slate-grey'>Pricing</div>
                        <div className='p-[0.2px] border-b-1 border-transparent hover:border-b hover:border-dark-slate-grey'>Company</div>
                        <div className='p-[0.2px] border-b-1 transition duration-100 ease-in-out border-transparent hover:border-b hover:border-dark-slate-grey'>Learn more</div>
                        <button onClick={() => getProduct(3)}
                            className='p-[0.2px] border-b-1 transition duration-100 ease-in-out border-transparent hover:border-b hover:border-dark-slate-grey'>
                            Get Product
                        </button>
                    </div>
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

                            <p className='text-xs hover:underline'>{`Shopping bag(${total})`}</p>

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

export default Navbar;