import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Faq from '@/components/Faq'
import ImageZoom from '@/components/ImageZoom'
import ImageMagnifier from '@/components/ImageMagnifier'
import { CardPage } from '@/components/CardPage'
import { CartItem } from '@/context/CartProvider'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { getAllProducts } from '@/lib/backend'
import { useShoppingCart } from '@/context/ShoppingCartProvider'


export default function Home() {

  const { user } = useAuth({ middleware: '', redirectIfAuthenticated: ''});
  const { cartQuantity,
        decreaseCartQuantity,
        cartItems,
        increaseCartQuantity,
        products,
        getProducts,
        closeCart,
        removeCartItem,
        getItemQuantity
    } = useShoppingCart()

  
    useEffect(() => {
      getProducts()
      
    }, [])



  return (
    <>
      <div className='flex py-[20px] justify-center'>
        <div className='flex flex-col w-3/5'>
            {(!cartItems) ?
                            <p className='mt-4'>No items in cart</p> :
                            cartItems.map(item => {

                                const product = products.filter(p => p.id === item.id)[0];
                                console.log('prdtFromcheck', product)

                                // return <div className='p-8 flex space-x-8 justify-between'>
                                return <>
                                  <div className='grid grid-cols-4 gap-x-4 gap-y-16 py-12'>
                                    <div className='flex justify-center items-center'>
                                        <img
                                            className='w-24 h-24'
                                            src={product.image} />

                                    </div>
                                    <div className='flex flex-col items-start'>
                                      <a href={`/product/${product.id}`}>
                                        <p className='text-md'>{product.title}</p>
                                      </a>
                                      <p className='text-sm'>Category: {product.category}</p>
                                      <div className='mt-8 flex justify-center'>
                                        <button
                                            onClick={() => decreaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>-</button>
                                        <p className='text-sm'>{item.quantity}</p>
                                        <button
                                            onClick={() => increaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>+</button>
                                      </div>
                                    </div>
                                    <div>
                                      <p className='text-xs'>Price</p>
                                      <p className='mr-0'>${product.price}</p>
                                    </div>
                                    <div className='cursor-pointer'
                                      onClick={() => removeCartItem(item.id)}>
                                      <svg viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="16"
                                        width="16">
                                          <path d="M6.229 1.229C6.105 1.352 6 1.577 6 2H5c0-.577.145-1.102.521-1.479C5.898.145 6.423 0 7 0h2c.577 0 1.102.145 1.479.521C10.855.898 11 1.423 11 2h-1c0-.423-.105-.648-.229-.771C9.648 1.105 9.423 1 9 1H7c-.423 0-.648.105-.771.229ZM1 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5ZM12 15c.423 0 .648-.105.771-.229.124-.123.229-.348.229-.771V5h1v9c0 .577-.145 1.102-.521 1.479-.377.376-.902.521-1.479.521H4c-.577 0-1.102-.145-1.479-.521C2.145 15.102 2 14.577 2 14V5h1v9c0 .423.105.648.229.771.123.124.348.229.771.229h8ZM14.5 5h-13a.5.5 0 0 1 0-1h13a.5.5 0 0 1 0 1Z M6 11.5v-3a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0ZM9 8.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-1 0Z">
                                            </path>
                                            </svg>
                                    </div>
                                </div>
                                <hr />
                                </>
                            })
                        }

        </div>
        {(!cartItems) ?
        <p></p> :
        <div className='flex justify-top flex-col gap-y-8 w-1/5 border border-gray-300 p-4'>
          <p>Total</p>
          <p className='text-sm'>Shipping</p>
          <a href='/checkout'>
            <button className='w-full bg-purple-300 rounded-full py-3'>Proceed to Checkout</button>
          </a>

        </div>

        }
        

      </div>



    </>
  )
}
