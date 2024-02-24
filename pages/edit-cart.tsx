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
        cartItems,
        decreaseCartQuantity,
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
                                  {(cartItems === undefined || cartItems.length === 0) ?
                            <p className='mt-4'>No items in cart</p> :
                            cartItems.map(item => {

                                const product = products.filter(p => p.id === item.id)[0];
                                console.log('prdtFromcheck', product)

                                // return <div className='p-8 flex space-x-8 justify-between'>
                                return <>
                                  <div className='grid grid-cols-3 gap-x-4 gap-y-16 py-12'>
                                    <div className='flex justify-center items-center'>
                                        <img
                                            className='w-24 h-24'
                                            src={product.image} />

                                    </div>
                                    <div className='flex flex-col items-start'>
                                      <p className='text-md'>{product.title}</p>
                                      <p className='text-sm'>Category: {product.category}</p>
                                      <div className='mt-8 flex justify-center'>
                                        <button
                                            onClick={() => increaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>+</button>
                                        <p className='text-sm'>{item.quantity}</p>
                                        <button
                                            onClick={() => decreaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>-</button>
                                      <button
                                        onClick={() => removeCartItem(item.id)}
                                        className='ml-8 text-sm'>Remove</button>
                                      </div>
                                    </div>
                                    <div>
                                      <p className='text-xs'>Price</p>
                                      <p className='mr-0'>${product.price}</p>
                                    </div>
                                </div>
                                <hr />
                                </>
                            })
                        }

        </div>
        {(cartItems === undefined || cartItems.length === 0) ?
        <p></p> :
        <div className='flex justify-top flex-col gap-y-8 w-1/5 border border-gray-300 p-4'>
          <p>Total</p>
          <p className='text-sm'>Shipping</p>
          <button className='w-full bg-purple-300 rounded-full py-3'>Proceed to Checkout</button>

        </div>

        }
        

      </div>



    </>
  )
}
