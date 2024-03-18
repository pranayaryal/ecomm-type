import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
// import { useShoppingCartLocal } from '@/context/ShoppingCartProviderLocal'
import { getAllProducts, removeFromCart } from '@/lib/backend'
import { useRouter } from 'next/router'

const ShoppingCartExperimental = ({ isOpen }: { isOpen: boolean }) => {
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
        getItemQuantity
    } = useShoppingCart()
    console.log('cartItems', cartItems)

    useEffect(() => {
        getProducts()

    }, [])

    const filterProducts = (id: number) => {
        return
    }


    return (
        <>
            {isOpen &&
                <aside
                    className='h-screen overflow-auto bg-white fixed px-16 py-16 z-20 top-5 right-5 transition-all ease duration-300 w-3/12'
                >
                    <div className='flex flex-col'>

                        {(cartItems === undefined || cartItems.length === 0) ?
                            <p className='mt-4'>No items in cart</p> :
                          cartItems.map(item => {
                                const product = products.filter(p => p.id === item.id)[0];
                                 return <>
                                    <div className='mt-4 flex items-center space-x-4'>
                                        <img
                                            className='w-16 h-16'
                                            src={product.image} />
                                        <a className='hover:underline' href={`/product/${product.id}`}>
                                          <p className='text-sm'>{product.title}</p>
                                        </a>

                                    </div>
                                    <hr className='mt-4'/>
                                </>
                        })
                        }
                        {cartItems.length > 0 ? 
                          <a href='/edit-cart'>
                          <button
                          className='mt-16 py-3 w-full bg-slate-300 rounded-full'>Edit Cart</button>
                          </a>
                           : <p></p>}
                    </div>


                </aside>

            }

        </>
    )

}


export default ShoppingCartExperimental