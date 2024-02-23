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

                                return <div className='flex gap-x-2'>
                                    <div>
                                        <img
                                            className='w-16 h-16'
                                            src={product.image} />

                                    </div>
                                    <div className='flex flex-col justify-between items-center'>
                                      <p className='text-sm'>{product.title}</p>
                                      <div className='flex justify-center space-x-2'>
                                        <button
                                            onClick={() => increaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>+</button>
                                        <p className='text-sm'>{item.quantity}</p>
                                        <button
                                            onClick={() => decreaseCartQuantity(item.id)}
                                            className='flex justify-center h-6 w-6 bg-pink-100 rounded-full px-2 py-2 items-center'>-</button>
                                      </div>
                                      <button
                                        onClick={() => removeCartItem(item.id)}
                                        className='ml-2 text-sm'>Remove</button>
                                    </div>
                                    <hr className='mt-4'/>
                                </div>
                            })
                        }

        </div>
        <div className='flex flex-col w-1/5'>

        </div>
        

      </div>



    </>
  )
}
