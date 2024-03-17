import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
// import { useShoppingCartLocal } from '@/context/ShoppingCartProviderLocal'
import { getAllProducts, removeFromCart } from '@/lib/backend'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

export default function ShoppingCartSlide({ isOpen }: { isOpen: boolean }) {
    // console.log('shopping cart data', data)
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const asideRef = useRef<HTMLElement>(null)
    const { cartQuantity,
        cartItems,
        decreaseCartQuantity,
        increaseCartQuantity,
        products,
        getProducts,
        removeCartItem,
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

    const sideVariants = {
        closed: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: -1
            }
        },
        open: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1
            }
        }

    }

    const itemVariants = {
        closed: {
            opacity: 0
        },
        open: { opacity: 1 }
    };




    return (
        <>
            <AnimatePresence>
                {isOpen && <motion.aside
                    initial={{ width: 0 }}
                    animate={{
                        width: 450
                    }}
                    exit={{
                        width: 0,
                        transition: { delay: 0.5, duration: 0.3 }
                    }}
                    ref={asideRef}
                    className='h-screen overflow-auto bg-white fixed px-16 py-16 z-20 top-0 right-0 transition-all ease duration-300 w-3/12'
                >



                    <div className='flex flex-col'>

                        {(cartItems === undefined || cartItems.length === 0) ?
                            <p className='mt-4'>No items in cart</p> :
                            cartItems.map(item => {
                                const product = products.filter(p => p.id === item.id)[0];
                                return <motion.div
                                    variants={sideVariants}
                                >
                                    <div className='mt-4 flex items-center space-x-4'>
                                        <img
                                            className='w-16 h-16'
                                            src={product.image} />
                                        <a className='hover:underline' href={`/product/${product.id}`}>
                                            <p className='text-sm'>{product.title}</p>
                                        </a>

                                    </div>
                                    <div className='mt-4 flex justify-between items-center'>
                                        <div className='flex justify-center space-x-2'>
                                            <button
                                                onClick={() => decreaseCartQuantity(item.id)}
                                                className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>-</button>
                                            <p className='text-sm'>{item.quantity}</p>
                                            <button
                                                onClick={() => increaseCartQuantity(item.id)}
                                                className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>+</button>
                                        </div>
                                        <button
                                            onClick={() => removeCartItem(item.id)}
                                            className='ml-2 text-sm'>Remove</button>
                                    </div>
                                    <hr className='mt-4' />
                                </motion.div>
                            })
                        }
                        {cartItems.length > 0 ?
                            <a href='/edit-cart'>
                                <button
                                    className='mt-16 py-3 w-full bg-slate-300 rounded-full'>Edit Cart</button>
                            </a>
                            : <p></p>}
                    </div>

                    <button aria-label='Close'
                        onClick={closeCart}
                        className='absolute top-8 focus:outline-none right-8 text-3xl text-black cursor-pointer'>
                        &times;
                    </button>
                </motion.aside>}

            </AnimatePresence>
        </>
    )

}

