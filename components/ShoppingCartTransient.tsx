import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
// import { useShoppingCartLocal } from '@/context/ShoppingCartProviderLocal'
import { getAllProducts, removeFromCart } from '@/lib/backend'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

export default function ShoppingCartTransient({ isOpen }) {
    // console.log('shopping cart data', data)

    const asideRef = useRef<HTMLElement>(null)
    const { cartQuantity,
        cartItems,
        decreaseCartQuantity,
        increaseCartQuantity,
        products,
        getProducts,
        removeCartItem,
        closeCart,
        getItemQuantity,
        clickedItem
    } = useShoppingCart()
    console.log('cartItems', cartItems)

    useEffect(() => {
        getProducts()

    }, [])

    // const item = cartItems[cartItems.length - 1]



    return (
        <>
            <AnimatePresence>
                {isOpen && <motion.aside
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    ref={asideRef}
                    className='overflow-auto bg-white fixed px-8 py-8 z-20 top-5 right-5'
                >
                    <div className='flex flex-col'>

                        {(cartItems === undefined || cartItems.length === 0) ?
                            <p className='mt-4'>No items in cart</p> :
                            [clickedItem].map(item => {
                                const product = products.filter(p => p.id === item.id)[0];
                                return <motion.div>
                                    <div className='mt-4 flex items-center space-x-4 text-xs'>
                                        <img
                                            className='w-16 h-16'
                                            src={product.image} />
                                            <div className='flex flex-col gap-y-3'>
                                                <p>{product.title}</p>
                                                <p>Quantity: 1</p>
                                            </div>
                                    </div>
                                </motion.div>
                            })
                        }
                    </div>

                </motion.aside>}

            </AnimatePresence>
        </>
    )

}

