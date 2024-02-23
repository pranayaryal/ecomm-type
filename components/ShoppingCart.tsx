import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import { getAllProducts } from '@/lib/backend'

const ShoppingCart = ({ isOpen }: { isOpen: boolean }) => {
    // console.log('shopping cart data', data)
    const [open, setOpen] = useState(false)
    const asideRef = useRef<HTMLElement>(null)
    const { cartQuantity,
        cartItems,
        decreaseCartQuantity,
        increaseCartQuantity,
        products,
        getProducts,
        closeCart,
        getItemQuantity
    } = useShoppingCart()
    console.log('cartItems', cartItems)

    useEffect(() => {
        getProducts()

    }, [])

    const filterProducts = (id: number) => {
        return
    }

    useEffect(() => {
        const handleOutsideClick = (event: Event) => {
            if (!asideRef.current?.contains(event.target as Node)) {
                if (!isOpen) return
                closeCart()
            }
        };
        window.addEventListener('mousedown', ((event: Event) => handleOutsideClick(event)))
        return () => window.removeEventListener('mousedown', ((event: Event) => handleOutsideClick(event)))

    }, [isOpen, asideRef])

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (!isOpen) return;

            if (event.key === 'Escape') {
                closeCart()
            }
        };
        document.addEventListener('keyup', ((event: KeyboardEvent) => handleEscape(event)))
        return () => document.removeEventListener('keyup', ((event: KeyboardEvent) => handleEscape(event)))
    }, [isOpen])




    return (
        <>
            {isOpen &&
                <aside
                    ref={asideRef}
                    className='h-screen overflow-auto bg-white fixed px-16 py-24 z-20 top-0 right-0 transition-all ease duration-300 w-3/12'
                >
                    <div className='flex flex-col'>

                        {(cartItems === undefined || cartItems.length === 0) ?
                            <p className='mt-4'>No items in cart</p> :
                            cartItems.map(item => (
                                <>
                                    <div className='mt-4 flex items-center space-x-4'>
                                        <img
                                            className='w-16 h-16'
                                            src={products.filter(p => p.id === item.id)[0].image} />
                                        <p className='text-sm'>{products.filter(p => p.id === item.id)[0].title}</p>

                                    </div>
                                    <div className='mb-4 px-8 flex justify-end items-center'>
                                        <button
                                            onClick={() => increaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>+</button>
                                        <p className='text-sm'>{item.quantity}</p>
                                        <button
                                            onClick={() => decreaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>-</button>
                                    </div>
                                    <hr className='mt-4'/>
                                </>
                            ))
                        }
                        {cartItems.length > 0 ? <button className='mt-16 py-3 w-full bg-slate-300 rounded-full'>Proceed to checkout</button> : <p></p>}
                    </div>

                    <button aria-label='Close'
                        onClick={closeCart}
                        className='absolute top-8 focus:outline-none right-8 text-3xl text-black cursor-pointer'>
                        &times;
                    </button>

                </aside>

            }

        </>
    )

}


export default ShoppingCart