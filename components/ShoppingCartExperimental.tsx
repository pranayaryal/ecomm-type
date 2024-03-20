import React from 'react'
import { useEffect } from 'react'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import { AnimatePresence, motion } from 'framer-motion'

const ShoppingCartExperimental = ({ isOpen, cartItems, products }) => {
    // console.log('shopping cart data', data)
    console.log('cartItems', cartItems)




    return (
        <AnimatePresence>
            {isOpen &&
                <motion.aside
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        ease: "linear",
                        duration: 0.5,
                        x: { duration: 1 }
                    }}
                    exit={{ opacity: 0, y: 0 }}
                    className='overflow-auto bg-white fixed p-8 z-20 top-15 right-5 transition-all ease duration-300 w-[350px]'
                >
                    <div className='flex flex-col'>

                        {(cartItems === undefined || cartItems.length === 0) ?
                            (<p className='mt-4'>No items in cart</p>) :
                            (cartItems.map(item => {
                                const product = products.filter(p => p.id === item.id)[0];
                                return <div className='mt-4 flex items-center space-x-4'>
                                    <img
                                        className='w-16 h-22 object-fit'
                                        src='./shorts.jpeg' />
                                    <a className='hover:underline text-xs' href={`/product/${product.id}`}>
                                        <p>{product.title}</p>
                                        <p className='font-bold'>$45</p>
                                        <p className='text-[11px]'>Quantity: 1</p>
                                        <p className='text-[11px]'>Color: white/patterned</p>
                                    </a>

                                </div>

                            })

                            )

                        }
                        {cartItems.length > 0 && (
                            <>
                                <hr className='mt-8'/>
                                <div className='mt-4 text-[11px] flex justify-between'>
                                    <p className='text-gray-600'>Order value</p>
                                    <p>$24.29</p>
                                </div>
                                <div className='mt-2 text-[11px] flex justify-between'>
                                    <p className='text-gray-600'>Shipping</p>
                                    <p>$5.29</p>
                                </div>
                                <hr className='mt-4'/>
                                <div className='mt-2 text-[18px] flex justify-between'>
                                    <p className='text-gray-600'>Total</p>
                                    <p>$5.29</p>
                                </div>
                                <a href='/checkout'>
                                    <button
                                        className='mt-8 py-3 w-full bg-black hover:bg-gray-800 text-white'>Checkout</button>
                                </a>
                                <a href='/edit-cart'>
                                    <button
                                        className='mt-4 py-3 w-full bg-white border border-black hover:underline'>Shopping bag</button>
                                </a>
                            </>
                        )
                        }
                    </div>


                </motion.aside>

            }

        </AnimatePresence>
    )

}


export default ShoppingCartExperimental