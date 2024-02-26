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
    <div className='max-w-[1064px] ml-auto mr-auto'>
      <div className='flex justify-center space-x-8'>
        <div className='flex flex-col gap-y-4 w-2/3 py-6 px-5'>
        <div className='bg-white py-6 px-5 w-full'>
          <p className='text-sm font-bold'>My Information</p>
          <div className='w-1/2 flex flex-col'>
            <label className='text-xs'>Email</label>
            <input className='text-xs mt-1 px-4 py-2 border border-gray-200 outline-none'/>
          </div>
          <div className='flex space-x-4 w-full mt-4'>
            <div className='flex flex-col w-1/2'>
              <label className='text-xs'>First name</label>
              <input className='text-xs mt-1 px-4 py-2 border border-gray-200 outline-none'/>
            </div>
            <div className='flex flex-col w-1/2'>
              <label className='text-xs'>Last Name</label>
              <input className='text-xs mt-1 px-4 py-2 border border-gray-200 outline-none'/>
            </div>
          </div>
          <button className='bg-black text-white w-1/3 text-sm py-3 px-3 ml-auto mr-auto mt-4'>Save</button>
        </div>
        <div className='bg-white py-6 px-5 w-full'>
          <p className='text-sm font-bold'>Billing address</p>
          <p className='text-xs mt-2'>Enter your billing address</p>
          <div className='flex flex-col mt-4'>
            <label className='text-xs'>Address</label>
            <input className='px-4 py-2 border border-gray-200 outline-none'/>
            <span className='text-xs text-gray-500'>Street address, P.0 box or military address</span>
          </div>
          <div className='flex space-x-4 w-full mt-4'>
            <div className='flex flex-col w-1/2'>
              <label className='text-xs'>Town/City</label>
              <input className='text-xs mt-1 px-4 py-2 border border-gray-200 outline-none'/>
            </div>
            <div className='flex flex-col w-1/2'>
              <label className='text-xs'>Postal code</label>
              <input className='text-xs mt-1 px-4 py-2 border border-gray-200 outline-none'/>
            </div>
          </div>
          <div className='flex flex-col mt-4'>
            <label className='text-xs'>State</label>
            <input className='px-4 py-2 border border-gray-200 outline-none'/>
          </div>

        </div>
        <div className='bg-white py-6 px-5 w-full'>
          <p className='text-sm font-bold'>Shipping</p>
          <div className='flex mt-8 items-center space-x-2'>
            <input type='checkbox' className='w-3 h-3'/>
            <p className='text-xs'>Same as my billing address</p>

          </div>
        </div>
        <button className='bg-black text-white py-3 w-1/3 mr-auto mx-auto'>Select</button>
        </div>
        {(cartItems === undefined || cartItems.length === 0) ?
        <p></p> :
        <div className='flex justify-top flex-col gap-y-8 bg-white w-1/3 p-4'>
          <p>Total</p>
          <p className='text-sm'>Shipping</p>
          <a href='/edit-cart'>
          <button className='px-3 py-2 bg-purple-100 w-full rounded-full'>Edit Cart</button>
          </a>

        </div>

        }

      </div>

    </div>
  )
}
