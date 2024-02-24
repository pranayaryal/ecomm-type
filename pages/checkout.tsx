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
        <div className='flex flex-col gap-y-4 w-3/5'>
          <div className='flex justify-center space-x-8'>
            <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='First Name'/>
            <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='Last Name'/>
          </div>
          <div className='flex justify-center space-x-8'>
            <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='phone'/>
            <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='email'/>
          </div>
          <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='address'/>
          <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='Postal Code'/>
          <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='City'/>
          <input className='px-4 py-2 border border-gray-200 rounded-md outline-none' placeholder='State'/>

        </div>
        {(cartItems === undefined || cartItems.length === 0) ?
        <p></p> :
        <div className='flex justify-top flex-col gap-y-8 w-1/5 border border-gray-300 p-4'>
          <p>Total</p>
          <p className='text-sm'>Shipping</p>
          <a href='/edit-cart'>
          <button className='px-3 py-2 bg-purple-100 w-full rounded-full'>Edit Cart</button>
          </a>

        </div>

        }
        

      </div>



    </>
  )
}
