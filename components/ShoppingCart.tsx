import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import { getAllProducts } from '@/lib/backend'

const ShoppingCart = ({ isOpen }: { isOpen: boolean }) => {
    // console.log('shopping cart data', data)
    const [open, setOpen] = useState(false)
    const [ products, setProducts ] = useState([])
    const asideRef = useRef<HTMLElement>(null)
    const { cartQuantity,
        cartItems,
        decreaseCartQuantity,
        increaseCartQuantity,
        closeCart,
        getItemQuantity
    } = useShoppingCart()
    console.log('cartItems', cartItems)
    

    useEffect(() => {
        const getProducts = async () => {
            console.log('loading prodts')
            const prdts = await getAllProducts()
            setProducts(prdts)
        }
        getProducts()
        console.log('prdtsShopping', products)
    }, [open])

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
                    ref={asideRef} className='h-screen bg-gray-100 fixed px-8 py-12 z-20 top-0 right-0 transition-all ease duration-300 w-3/12'
                >
                    <p>Shopping cart</p>
                    <div className='flex flex-col'>
                        {cartItems.map(item => {
                            return (
                                <div>
                                    <p>{item.id}</p>
                                    <p>{item.quantity}</p>
                                </div>
                            )
                        })}

                    </div>

                    <button aria-label='Close'
                        onClick={closeCart}
                        className='absolute top-1 focus:outline-none right-3 text-3xl text-black cursor-pointer'>
                        &times;
                    </button>

                </aside>

            }

        </>
    )

}


export default ShoppingCart